#!/bin/bash

# ValidateService
# This is the last deployment lifecycle event. It is used to
# verify the deployment was completed successfully.

# for now we are just checking that we get back a page from the server
echo validating service...;

# we use curl to test that the server is responding with a 200 HTTP status code
# its necessary to use -k --insecure when testing localhost over https since the
# certificate cannot be validated against localhost
sudo pm2 list
HTTP_STATUS="$(curl --write-out %{http_code} --silent --output /dev/null -k --insecure https://localhost)"
if [ $HTTP_STATUS = "200" ]; then
        echo "Server responded with 200. All is well";
        echo "service validated successfully"
        exit 0; #successfully exit
else
        echo "Server responded with wrong http response code";
        echo "service validation failed"
        exit 1; #exit with failure:
fi;
