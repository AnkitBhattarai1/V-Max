
#!/bin/bash


if [ -f "target/auth_service.jar" ]; then
    java -jar target/auth_service.jar
else
    mvn spring-boot:run
fi
