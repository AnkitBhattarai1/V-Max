#!/bin/bash
set -e

# Check for required env variables
: "${SQL_SERVER:?Need to set SQL_SERVER}"
: "${SQL_SERVER_PORT:?Need to set SQL_SERVER_PORT}"
: "${MYSQL_USERNAME:?Need to set MYSQL_USERNAME}"
: "${MYSQL_PASSWORD:?Need to set MYSQL_PASSWORD}"

# Optionally print them for debugging
echo "Running with: $SQL_SERVER:$SQL_SERVER_PORT, User: $MYSQL_USERNAME, Port: $VIDEO_SERVICE_SERVER_PORT"

if [ -f "target/videro_service.jar" ]; then
  java -jar target/auth_service.jar
else
  mvn spring-boot:run
fi
