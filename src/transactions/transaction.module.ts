import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferEntity } from './entity/transfer.entity';
import { AccountEntity } from '../accounts/entity/account.entity';
import { KYCEntity } from '../identities/entity/kyc.entity';
import { MessagingModule } from '../messaging/messaging.module';

import { TransferRepository } from './repository/transfer.repository';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    MessagingModule,
    TypeOrmModule.forFeature([AccountEntity]),
    TypeOrmModule.forFeature([KYCEntity]),
    TypeOrmModule.forFeature([TransferEntity]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransferRepository],
})
export class TransactionModule {}
