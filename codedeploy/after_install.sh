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
echo installing application...
npm install

echo building application...
npm run codedeploy:production:build-server
npm run codedeploy:production:build-client

echo after install finished
