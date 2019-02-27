# Material UI with SSR using React and Redux

## Goals

  * Material UI ✅
  * React 16 ✅
  * React-Router ✅
  * Redux ✅
  * Express ✅
  * Babel 8 ✅
  * Webpack 4 ✅
  * Server Side Rendering ✅
  * Hot Module Replacement ✅
  * Data fetching through a remote API ✅

## Installing

Once cloned locally, run `npm install`.

### Hot
`npm run hot`
will builds the client and start webpack-dev-server at http://localhost:8080. This environment is only for the client. There is no server side rendering.

### Dev
`npm run dev`
will builds the client and server and start the Server.
This environment is for testing server side rendering.
http://localhost:3000

### Production
`npm run production`
builds the client and server for production and will start the production server.
http://localhost:3000


### Environment Variables
NODE_ENV
API_URL
DISCORD_CLIENT_ID
DISCORD_CALLBACK
DISCORD_GUILD_ID
DISCORD_WELCOME_CHANNEL_ID
RECAPTCHA_SITE_KEY
