import express from 'express';
import http from 'http';
import renderApp from './src/server-render';
import createStore from './src/createStore';

global.window = {}
const app = express();
app.use(express.static('public'))
// Anything else gets passed to the client app's server rendering
app.get('*', function(req, res, next) {

    const store = createStore(req)
    // console.dir(store.getState())
    // //Some logic to initialize and load data into the store
    // const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    //   return route.loadData ? route.loadData(store) : null
    // }).map(promise => {
    //   // if its a promise then wrap it in a new promise that is gaurenteed to resolve.
    //   if(promise) {
    //     return new Promise((resolve, reject) => {
    //       promise.then(resolve).catch(resolve)
    //     })
    //   }
    // })

    // Wait for all the loadData promises to complete before rendering
    // Promise.all(promises).then(() => {

      // we use context to check if we need to update the res.status to 404 and for redirects/ navigation changes
      const context = {}
      const content = renderApp(req, store, context)
      console.log(context)
      if (context.url) {
        // using 301 causes browser to cache as permanently moved, so use 307 instead as temporary redirect
        return res.redirect(307, context.url)
      }
      if (context.notFound) {
        res.status(404)
      }
      res.send(content)
    // })
});

const server = http.createServer(app);
server.listen(3000, 'localhost', function(err) {
  if (err) throw err;

  const addr = server.address();

  console.log('Listening at http://%s:%d', addr.address, addr.port);
  console.log("__dirname:", __dirname)
});