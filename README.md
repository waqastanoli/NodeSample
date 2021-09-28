# EfuseBack
Demo project involving node/express, mongo db and redis in dockerized enviroment

# Build App with Docker

This docker configuration is self managed, and can be build with simple docker command

``docker-compose up --build -d``

# Build App with Shell

Shell script is also available with coded commands to handle docker operations

- stop application
``.\myapp.sh stop``
- start docker application
``.\myapp.sh run``
- clean dangling images and containers
``.\myapp.sh clean``
- help
``.\myapp.sh --help``
