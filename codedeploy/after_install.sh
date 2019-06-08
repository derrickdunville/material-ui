#!/bin/bash

# AfterInstall
# Use to run tasks after the replacement task set is created
# and one of the target groups is associated with it. If an
# optional test listener is specified, it is associated with
# the original task set. The results of a hook function at this
# lifecycle event can trigger a rollback.

# You can use this deployment lifecycle event for tasks such
# as configuring your application or changing file permissions.

echo after install running...

# Here we can will install the application with npm and build it
cd /var/www
sudo chown ubuntu:ubuntu -R .
echo installing application...
npm install

export NODE_ENV=production
export API_URL=https://api.material-ui.derrickdunville.com
export CLIENT_ROOT_URL=https://material-ui.derrickdunville.com
export DISCORD_CLIENT_ID=406318468703584266
export DISCORD_CALLBACK=https://api.material-ui.derrickdunville.com/oauth/discord/callback
export DISCORD_GUILD_ID=353342769630281738
export DISCORD_WELCOME_CHANNEL_ID=553815971597516800

# configuring secret ENV VARS on the instance using AWS Parameter Store
stripe_publishable_key=$(~/.local/bin/aws ssm get-parameters --region us-east-1 --names prodMaterialUiStripePublishableKey --with-decryption --query Parameters[0].Value)
export STRIPE_PUBLISHABLE_KEY=$stripe_publishable_key
echo $stripe_publishable_key

discord_client_secret=$(~/.local/bin/aws ssm get-parameters --region us-east-1 --names prodMaterialUiDiscordClientSecret --with-decryption --query Parameters[0].Value)
export DISCORD_CLIENT_SECRET=$discord_client_secret
echo $discord_client_secret

recaptcha_site_key=$(~/.local/bin/aws ssm get-parameters --region us-east-1 --names prodMaterialUiRecaptchaSiteKey --with-decryption --query Parameters[0].Value)
export RECAPTCHA_SITE_KEY=$recaptcha_site_key
echo recaptcha_site_key

echo "NODE_ENV: $NODE_ENV"
echo "API_URL: $API_URL"
echo "CLIENT_ROOT: $CLIENT_ROOT"
echo "DISCORD_CLIENT_ID: $DISCORD_CLIENT_ID"
echo "DISCORD_CALLBACK: $DISCORD_CALLBACK"
echo "DISCORD_GUILD_ID: $DISCORD_GUILD_ID"
echo "DISCORD_WELCOME_CHANNEL_ID: $DISCORD_WELCOME_CHANNEL_ID"

echo building application...
npm run codedeploy:production:build-server
npm run codedeploy:production:build-client

echo after install finished
