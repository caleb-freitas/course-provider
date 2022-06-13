# Apache Kafka

**Important:** run it before any application

## Configuring the network

The communication between the containers is done by the computer network itself. To do so, you need to do the following

- Add to you `/etc/hosts` file the host `127.0.0.1 host.docker.internal`

## Running the service

- Run `docker-compose up` to start the Apache Kafka service

## Notes

Whenever you need to pause this service, use `docker-compose down` to delete the volumes. Otherwise, running `docker-compose up` will give problems
