import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
// eslint-disable-next-line prettier/prettier
export class KafkaService extends ClientKafka implements OnModuleInit, OnModuleDestroy {
  constructor(configService: ConfigService) {
    super({
      client: {
        clientId: 'checker',
        brokers: [configService.get('KAFKA_BROKER')],
      },
    });
  }
  async onModuleInit() {
    await this.connect();
  }
  async onModuleDestroy() {
    await this.close();
  }
}
