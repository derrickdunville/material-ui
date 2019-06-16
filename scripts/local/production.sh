#!/bin/bash

# This script is used to build the client and server and start the server
# during local development. It is deployed with production webpack settings
# to emulate how it will be built in the actual production environment.

# Define your environment variable here
NODE_ENV=production
API_URL=http://localhost:3001/
DISCORD_CALLBACK=$API_URL'oauth/discord/callback'
DISCORD_CLIENT_ID="SET_ME"
DISCORD_GUILD_ID="SET_ME"
DISCORD_WELCOME_CHANNEL_ID="SET_ME"
STRIPE_PUBLISHABLE_KEY="SET_ME"
RECAPTCHA_SITE_KEY="SET_ME"

LIGHT_CYAN='\033[1;36m'
export NODE_ENV=$NODE_ENV
export API_URL=$API_URL
export DISCORD_CALLBACK=$DISCORD_CALLBACK
export DISCORD_CLIENT_ID=$DISCORD_CLIENT_ID
export DISCORD_GUILD_ID=$DISCORD_GUILD_ID
export DISCORD_WELCOME_CHANNEL_ID=$DISCORD_WELCOME_CHANNEL_ID
export STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE_KEY
export RECAPTCHA_SITE_KEY=$RECAPTCHA_SITE_KEY


signature='
________    ___________ __________  ___________
\______ \   \_   _____/ \______   \ \_   _____/
 |    |  \   |    __/_   |       _/  |    __/
 |    `   \  |        \  |    |   \  |     \
/_______  / /_______  /  |____|_  /  \___  /
        \/          \/          \/       \/
'
description="
***********************************************************
$signature
PRODUCTION LEVEL APPLICATION STARTING (local)

There will be two webpack build outputs. One for the
client and one for the server. Once you see both webpack
outputs the application will be running and can be viewed
at localhost:3000.

Note: Terminating this script may require 3 terminate commands, depending
on when it is terminated.

"
LIGHT_CYAN='\033[1;36m'
echo -e "${LIGHT_CYAN}$description"
echo -e "${LIGHT_CYAN} ENVIRONMENT VARIABLES"
echo -e "${LIGHT_CYAN}    NODE_ENV=$NODE_ENV"
echo -e "${LIGHT_CYAN}    API_URL=$API_URL"
echo -e "${LIGHT_CYAN}    DISCORD_CALLBACK=$DISCORD_CALLBACK"
echo -e "${LIGHT_CYAN}    DISCORD_CLIENT_ID=$DISCORD_CLIENT_ID"
echo -e "${LIGHT_CYAN}    DISCORD_GUILD_ID=$DISCORD_GUILD_ID"
echo -e "${LIGHT_CYAN}    DISCORD_WELCOME_CHANNEL_ID=$DISCORD_WELCOME_CHANNEL_ID"
echo -e "${LIGHT_CYAN}    STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE_KEY"
echo -e "${LIGHT_CYAN}    RECAPTCHA_SITE_KEY=$RECAPTCHA_SITE_KEY\n"
echo -e "${LIGHT_CYAN}***********************************************************"

echo -e "${LIGHT_CYAN}[production] Cleaning ./build and ./public directories"
rm -rf ./build ./public
echo -e "${LIGHT_CYAN}[production] Starting production client build"
babel-node ./node_modules/webpack/bin/webpack --config ./webpack/webpack.client.prod.js --production
echo -e "${LIGHT_CYAN}[production] Starting production server build"
babel-node ./node_modules/webpack/bin/webpack --config ./webpack/webpack.server.prod.js --production
echo -e "${LIGHT_CYAN}[production] Starting server"
echo -en "\e[0m"
node build/bundle.js
