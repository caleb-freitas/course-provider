import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['host.docker.internal:9094'],
      }
    }
  })
  app.startAllMicroservices().then(() => {
    console.log('[Classroom] microservice running')
  })
  app.listen(8002).then(() => {
    console.log('[Classroom] http server running')
  })
}
bootstrap();
