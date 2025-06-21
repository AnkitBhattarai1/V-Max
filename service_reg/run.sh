
#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Check if the project should be run using Maven or a JAR file
if [ -f "target/auth_service.jar" ]; then
    # Run from packaged JAR
    java -jar target/service_reg.jar
else
    # Run with Maven
    mvn spring-boot:run
fi
