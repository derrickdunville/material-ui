#!/bin/bash

# This script is used to build the client and server and start the server
# during ngrok development. It uses nodemon to watch for changes and restarts
# the server automatically.

# Set your subdomain for ngrok here
NGROK_SUBDOMAIN="SET_ME"

# Define your environment variable here
NODE_ENV=development
API_URL='https://api.'$NGORK_SUBDOMAIN'.ngrok.io/'
DISCORD_CALLBACK=$API_URL'oauth/discord/callback'
DISCORD_CLIENT_ID="SET_ME"
DISCORD_GUILD_ID="SET_ME"
DISCORD_WELCOME_CHANNEL_ID="SET_ME"
STRIPE_PUBLISHABLE_KEY="SET_ME"
RECAPTCHA_SITE_KEY="SET_ME"

export NGROK_SUBDOMAIN=$NGROK_SUBDOMAIN
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
NGROK LEVEL APPLICATION STARTING (local)

1) Initally nodemon will report app crashed. This is
because ./public and ./build directories are cleaned so
there is no bundle yet.

2) There will be two webpack build outputs. One for the
client and one for the server. Once you see both webpack
outputs the application will be running and can be viewed
at https://$NGROK_SUBDOMAIN.ngrok.io.

***********************************************************
"
LIGHT_CYAN='\033[1;36m'
echo -e "${LIGHT_CYAN}$description"
echo -e "${LIGHT_CYAN} ENVIRONMENT VARIABLES"
echo -e "${LIGHT_CYAN}    NGROK_SUBDOMAIN=$NGROK_SUBDOMAIN"
echo -e "${LIGHT_CYAN}    NODE_ENV=$NODE_ENV"
echo -e "${LIGHT_CYAN}    API_URL=$API_URL"
echo -e "${LIGHT_CYAN}    DISCORD_CALLBACK=$DISCORD_CALLBACK"
echo -e "${LIGHT_CYAN}    DISCORD_CLIENT_ID=$DISCORD_CLIENT_ID"
echo -e "${LIGHT_CYAN}    DISCORD_GUILD_ID=$DISCORD_GUILD_ID"
echo -e "${LIGHT_CYAN}    DISCORD_WELCOME_CHANNEL_ID=$DISCORD_WELCOME_CHANNEL_ID"
echo -e "${LIGHT_CYAN}    STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE_KEY"
echo -e "${LIGHT_CYAN}    RECAPTCHA_SITE_KEY=$RECAPTCHA_SITE_KEY\n"
echo -e "${LIGHT_CYAN}***********************************************************"

echo -e "${LIGHT_CYAN}[ngrok] Cleaning ./build and ./public directories"
rm -rf ./build ./public
echo -e "${LIGHT_CYAN}[ngrok] Starting ngrok level application"
xterm -hold -e "ngrok http 3000 -subdomain=$NGROK_SUBDOMAIN" &
babel-node ./node_modules/webpack/bin/webpack --config ./webpack/webpack.server.dev.js --watch &
babel-node ./node_modules/webpack/bin/webpack --config ./webpack/webpack.client.dev.js --watch &
nodemon --watch build/ --exec "node build/bundle.js"
