#!/bin/bash

set -e

# Check for required env variables
: "${SQL_SERVER:?Need to set SQL_SERVER}"
: "${SQL_SERVER_PORT:?Need to set SQL_SERVER_PORT}"
: "${MYSQL_USERNAME:?Need to set MYSQL_USERNAME}"
: "${MYSQL_PASSWORD:?Need to set MYSQL_PASSWORD}"
: "${AUTH_SERVICE_SERVER_PORT:?Need to set SERVER_PORT}"

# Optionally print them for debugging
echo "Running with: $SQL_SERVER:$SQL_SERVER_PORT, User: $MYSQL_USERNAME, Port: $SERVER_PORT"

if [ -f "target/auth_service.jar" ]; then
    java -jar target/auth_service.jar
else
    mvn spring-boot:run
fi
