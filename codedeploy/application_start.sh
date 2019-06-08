#!/bin/bash

# ApplicationStart
# You typically use this deployment lifecycle event to restart
# services that were stopped during ApplicationStop.

echo application start running..
# start the application with pm2
echo starting application...
cd /var/www
sudo pm2 start npm -- run codedeploy:production

echo application start finished
