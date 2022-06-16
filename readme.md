# Ignite Lab

A microservice application that simulates a course purchase platform and virtual study classroom

## Running the application

1. Start the Apache Kafka service. [See instructions](./kafka/readme.md)
2. Start the Purchase service. [See instructions](./purchase/readme.md)
3. Start the Classroom service. [See instructions](./classroom/readme.md)
4. Start the web application. [See instructions](./web/readme.md)

### Tips

- If you want to see the communication between the services you can either open your terminal and see the logs of the containers running

```bash
$ docker-compose logs -f purchase
$ docker-compose logs -f classroom
```

- Or you can just access `http://localhost:9021` and see the Kafka clusters, topics, and its messages

## Built with

- [TypeScript](https://www.typescriptlang.org/)
- [Nest.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Apache Kafka](https://kafka.apache.org/)
- [Docker](https://www.docker.com/)
- [GraphQL](https://graphql.org/)
- [Next.js](https://nextjs.org/)
