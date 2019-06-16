#!/bin/bash

# This script is used by codebuild to build the client and server bundles
# before deploying them to the instance.

# NODE_ENV is not defined on the build server. This is because the
# build server needs to install devDependencies which are required to
# build the bundle. If the NODE_ENV is set to production 'npm install'
# will only install the dependencies and not devDependencies. So prior
# to building the client and server bundles we need to set the
# NODE_ENV to production.

export NODE_ENV=development
babel-node ./node_modules/webpack/bin/webpack --config ./webpack/webpack.client.dev.js
babel-node ./node_modules/webpack/bin/webpack --config ./webpack/webpack.server.dev.js
