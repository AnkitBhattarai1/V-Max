
#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Set additional environment variables as needed
# export ANOTHER_VAR="value"

echo EUREKA_SERVER_PORT
read EUREKA_SERVER_PORT

export EUREKA_SERVER_PORT
# Check if the project should be run using Maven or a JAR file
if [ -f "target/auth_service.jar" ]; then
    # Run from packaged JAR
    java -jar target/auth_service.jar
else
    # Run with Maven
    mvn spring-boot:run
fi
