import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessagingController } from './messaging.controller';
import { MessagingService } from './messaging.service';
import { KycModule } from '../identities/kyc.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    ClientsModule.register([
      {
        name: 'IDENTITY_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'identity',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'identity-consumer',
          },
        },
      },
      {
        name: 'PAYMNTS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'payments',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'payments-consumer',
          },
        },
      },
    ]),
    KycModule,
    MessagingModule,
  ],
  providers: [MessagingService, MessagingController],
  controllers: [MessagingController],
  exports: [MessagingService],
})
export class MessagingModule {}
