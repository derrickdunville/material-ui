#!/bin/bash
export NODE_ENV=production
babel-node ./node_modules/webpack/bin/webpack --config ./webpack/webpack.client.prod.js --production
babel-node ./node_modules/webpack/bin/webpack --config ./webpack/webpack.server.prod.js --production
