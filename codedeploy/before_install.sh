#!/bin/bash

# BeforeInstall
# Used to run tasks before the replacement task set is created.
# One target group is associated with the original task set. If
# an optional test listener is specified, it is associated with
# the original task set. A rollback is not possible at this point.

# You can use this deployment lifecycle event for preinstall tasks,
# such as decrypting files and creating a backup of the current version.

# stdout logs of this process executing can be found in /opt/codedeploy-agent/deployment-root/47../<deployment_id>/logs/scripts.log
echo before install running...
echo nothing to do here yet
echo before install finished
