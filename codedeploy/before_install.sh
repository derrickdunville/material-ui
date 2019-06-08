#!/bin/bash

# BeforeInstall
# Used to run tasks before the replacement task set is created.
# One target group is associated with the original task set. If
# an optional test listener is specified, it is associated with
# the original task set. A rollback is not possible at this point.

# You can use this deployment lifecycle event for preinstall tasks,
# such as decrypting files and creating a backup of the current version.

# stdout logs of this process executing can be found in /opt/codedeploy-agent/deployment-root/47../<deployment_id>/logs/scripts.log

# here we update the server and install node and npm
# echo installing dependencies
# sudo apt-get update
# curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
# sudo apt-get install nodejs -y
# sudo apt-get -y install npm
#
# # check to make sure the symbolic link for nodejs node exists
# echo checking for nodejs symlink
# file="/usr/bin/node"
# if [ -f $file ] && [ ! -L $file ] ; then
#   echo "$file exists and is not a symlink"
#   sudo ln -s /usr/bin/nodejs
# else
#   echo "$file exists and is already a symlink"
# fi

# install the application using npm
# we need to traverse to where the application bundle is copied too.
echo before install running...
# cd /var/www/
# npm install
#
# echo installing pm2
# sudo npm install pm2 -g

echo before install finished
