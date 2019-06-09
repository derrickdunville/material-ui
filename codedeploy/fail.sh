#!/bin/bash

echo "should fail during application start hook"
nonzero # just a random command to get npm to return non-zero exit code
