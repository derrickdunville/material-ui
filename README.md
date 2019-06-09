# Material UI with SSR using React and Redux

## Goals
* Material UI ✅
* React 16 ✅
* React-Router ✅
* React-Redux ✅
* Express ✅
* Babel 7 ✅
* Webpack 4 ✅
* Server Side Rendering ✅
* Hot Module Replacement ✅
* Data fetching through a remote API ✅
* Discord Integration ✅
* Stripe Integration ✅

### Environment Variables
The following section outlines the required environment variables that need to be set before the application and all of its features will work correctly.

* `NODE_ENV` - The Node environment level. (production or development).
* `API_URL` - The URL the backend API is located at.
* `DISCORD_CLIENT_ID` - The client id of the connected Discord Application.
* `DISCORD_CALLBACK` - The callback URL for the connected Discord Application. Used for OAuth2.
* `DISCORD_GUILD_ID` - The Discord Guild ID
* `DISCORD_WELCOME_CHANNEL_ID` - The Discord channel ID the user is forwarded to when they navigate to the Discord Guild.
* `RECAPTCHA_SITE_KEY` - Google ReCaptcha V3 site key. Used to protect contact from.

## Local Environments
The `./environment` directory contains various scripts that are run by `npm` to set these environment variables prior to starting the application. The previously mentioned ENV VARS should be updated within these scripts.

### Installing
Once cloned locally, run
```
npm install
```
This will install all of the `npm` dependencies required to run the application.

### Running
The application can be ran using at different levels locally depending on what is being worked on.

#### Hot
```
npm run hot
```
This environment is only for client-side development. There is no server side rendering. This is best suited for working on styling since changes are hot-reloaded. This makes working on styling much quicker. This run command will build the client and start webpack-dev-server at http://localhost:8080.

#### Dev
```
npm run dev
```
This run command will build the client and server and start the server. This environment is for testing server side rendering. It is also setup to watch for changes similar to the hot environment. When changes are saved locally `nodemon` will re-build both the client and server. A page refresh is required to view the changes. It will be running at http://localhost:3000.

#### Ngrok
```
npm run ngrok
```
This environment is similar to the `dev` environment. The difference is this environment utilizes NGROK to tunnel the locally running application to the outside world. It is best suited to share the locally running application with the outside world. It is also helpful to test webhook events from third party API's such as Stripe and Discord. It will also be running at http://localhost:3000 locally but can also be accessed through the ngrok tunnel it gets assigned. Check the ngrok terminal for the URL. If you have a premium ngrok account, you can configure the `ngrok.sh` script to use your reserved ngrok domain.

#### Production
```
npm run production
```
This run command builds the client and server using the production `webpack` configuration and will start the production server. This environment is used for confirming that the application will build and run in the production integrated environment. It will also be running at http://localhost:3000.

## Integrated Environments
The integrated environments are currently hosted on AWS using Ubuntu 14.04 LTS EC2 instances.

### Continuous Integration / Continuous Delivery
CI/CD practices are used in this repository. AWS CodeBuild, CodeDeploy and CodePipeline are the tools currently being used to provide CI/CD for the project.

#### Branches
The following branches are setup with CodePipeline to deploy the application to various integrated environment levels. Commits to these branches will trigger automated deployments.

##### Master (Production)
This is the production branch. No commits should ever be made directly to this branch. The branch should only be changed by merging the staging branch into it. It is deployed to https://material-ui.derrickdunville.com

##### Staging
This is the staging branch. It is used as a pre-production, pre-release environment for quality assurance. This level should be used to test and confirm new features are working as expected in the integrated environment. It is deployed to https://staging.material-ui.derrickdunville.com
