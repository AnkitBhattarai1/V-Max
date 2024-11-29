
#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo SQL_SERVER
read SQL_SERVER

echo SQL_SERVER_PORT
read SQL_SERVER_PORT

echo User_Name
read User_Name

echo password
read password

# Set environment variables
export SQL_SERVER=${SQL_SERVER} 
export SQL_SERVER_PORT=${SQL_SERVER_PORT}
export MYSQL_USERNAME=${User_Name}
export MYSQL_PASSWORD=${password}

# Set additional environment variables as needed
# export ANOTHER_VAR="value"

# Check if the project should be run using Maven or a JAR file
if [ -f "target/auth_service.jar" ]; then
    # Run from packaged JAR
    java -jar target/auth_service.jar
else
    # Run with Maven
    mvn spring-boot:run
fi
