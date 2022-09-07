import { Controller, Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { MessagingService } from './messaging.service';

@Controller('messaging')
export class MessagingController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly client: MessagingService,
    @Inject('PAYMNTS_SERVICE') private readonly paymntsClient: ClientKafka,
    @Inject('IDENTITY_SERVICE') private readonly identityClient: ClientKafka,
  ) {}

  @MessagePattern('identity.denied')
  handleKYCDenied(@Payload() message: any, @Ctx() context: KafkaContext) {
    return this.client.handleKYCDenied(message, context);
  }
  @MessagePattern('identity.expired')
  handleKYCExpired(@Payload() message: any, @Ctx() context: KafkaContext) {
    return this.client.handleKYCExpired(message, context);
  }
  @MessagePattern('identity.rejected')
  handleKYCRejected(@Payload() message: any, @Ctx() context: KafkaContext) {
    return this.client.handleKYCRejected(message, context);
  }

  @MessagePattern('identity.approved')
  handleKYCApproved(@Payload() message: any, @Ctx() context: KafkaContext) {
    return this.client.handleKYCApproved(message, context);
  }

  @MessagePattern('transaction.completed')
  handleTxCreated(@Payload() message: any, @Ctx() context: KafkaContext) {
    return this.client.handleTXCompleted(message, context);
  }

  @MessagePattern('transaction.updated')
  handleTxUpdated(@Payload() message: any, @Ctx() context: KafkaContext) {
    return this.client.handleTxUpdated(message, context);
  }
  async onModuleInit() {
    ['identity.denied', 'identity.expired', 'identity.rejected', 'identity.approved'].forEach((key) =>
      this.identityClient.subscribeToResponseOf(`${key}`),
    );
    ['transaction.completed', 'transaction.approved', 'transaction.rejected'].forEach((key) =>
      this.paymntsClient.subscribeToResponseOf(`${key}`),
    );

    Promise.all([await this.identityClient.connect(), await this.paymntsClient.connect()]);
  }
  async onModuleDestroy() {
    Promise.all([await this.identityClient.close(), await this.paymntsClient.close()]);
  }
}
