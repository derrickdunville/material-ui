import express from 'express'
import http from 'http'
import https from 'https'
import renderApp from './src/server-render'
import createStore from './src/createStore'
import proxy from 'express-http-proxy'
import Routes from './src/routes/app'
import { matchRoutes } from 'react-router-config'
import queryString from 'query-string'
import compression from 'compression'

global.window = {innerWidth: 1000, innerHeight: 1080}

console.log("NODE_ENV: ", process.env.NODE_ENV)
console.log("API_URL: ", process.env.API_URL)
console.log("DISCORD_CLIENT_ID: ", process.env.DISCORD_CLIENT_ID)
console.log("DISCORD_CALLBACK: ", process.env.DISCORD_CALLBACK)
console.log("DISCORD_GUILD_ID: ", process.env.DISCORD_GUILD_ID)
console.log("DISCORD_WELCOME_CHANNEL_ID: ", process.env.DISCORD_WELCOME_CHANNEL_ID)
console.log("RECAPTCHA_SITE_KEY: ", process.env.RECAPTCHA_SITE_KEY)
console.log("STRIPE_PUBLISHABLE_KEY: ", process.env.STRIPE_PUBLISHABLE_KEY)

const app = express()
app.use(compression())
// We serve bundle.js for client and any other static asstets from the public directory
var cacheTime = 86400000*7     // 7 days

/* Production
  We are serving gzip'd bundle.
  Here we need to tell the browser about the encoding
*/
if(process.env.NODE_ENV == 'production'){
  app.get('*.js.gz', function(req, res, next){
    res.set('Content-Encoding', 'gzip')
    res.set('Content-Type', 'text/javascript')
    next()
  })

  // Cache-Control
  app.use(function (req, res, next) {
    if (req.url.match(/^\/(css|img|font|png|jpg|jpeg|gif|gz|js)\/.+/)) {
      res.setHeader('Cache-Control', 'public, max-age=3600') // cache header
    }
    next()
  })
}

app.use(express.static('public', { maxAge: cacheTime }))

// Client side api calls need to be proxied to the api
app.use('/api', proxy('http://127.0.0.1:3001'))



app.get('*', function(req, res, next) {

    console.dir(req.query)
    const store = createStore(req)
    // console.dir(store.getState())
    //Some logic to initialize and load data into the store
    const promises = matchRoutes(Routes, req.url).map(({ route, match }) => {
      return route.loadData ? route.loadData(store, match, req.query, req.url, req.get("Referrer") || null) : null
    }).map(promise => {
      // if its a promise then wrap it in a new promise that is gaurenteed to resolve.
      if(promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve)
        })
      }
    })

    // Wait for all the loadData promises to complete before rendering
    Promise.all(promises).then(() => {

      // we use context to check if we need to update the res.status to 404 and for redirects/ navigation changes
      const context = {}
      const content = renderApp(req, store, context)
      console.log(context)
      if (context.url) {
        // using 301 causes browser to cache as permanently moved, so use 307 instead as temporary redirect
        return res.redirect(307, context.url + encodeURI("?from="+req.path))
      }
      if (context.notFound) {
        res.status(404)
      }
      res.send(content)
   })
})

// Setup server to listen over https
const server = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)

server.listen(3000, 'localhost', function(err) {
  if (err) throw err

  if(process.env.DISCORD_CLIENT_ID == undefined ||
    process.env.DISCORD_CALLBACK == undefined){
    console.error("DISCORD env vars not found. Discord OAuth will not work")
  }

  const addr = server.address()

  console.log('Listening at http://%s:%d', addr.address, addr.port)
  console.log("__dirname:", __dirname)
})
