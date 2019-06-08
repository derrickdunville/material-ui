#!/bin/bash

# ApplicationStop
# This deployment lifecycle event occurs even before the application
# revision is downloaded. You can specify scripts for this event to
# gracefully stop the application or remove currently installed packages
# in preparation of a deployment. The AppSpec file and scripts used for
# this deployment lifecycle event are from the previous successfully
# deployed application revision.

# Note
# An AppSpec file does not exist on an instance before you deploy to it.
# For this reason, the ApplicationStop hook does not run the first time
# you deploy to the instance. You can use the ApplicationStop hook the
# second time you deploy to an instance.

# To determine the location of the last successfully deployed application
# revision, the CodeDeploy agent looks up the location listed in the
# deployment-group-id_last_successful_install file.

# This file is located in:
# /opt/codedeploy-agent/deployment-root/deployment-instructions
# folder on Ubuntu Server Amazon EC2 instances.

# To troubleshoot a deployment that fails during the ApplicationStop
# deployment lifecycle event, see Troubleshooting failed ApplicationStop,
# BeforeBlockTraffic, and AfterBlockTraffic deployment lifecycle events.
# https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-lifecycle-event-failures

# simply stop the application process using pm2
echo stopping application...
sudo pm2 stop --silent npm
sudo pm2 list
echo application stopped
