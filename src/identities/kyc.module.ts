import { Module } from '@nestjs/common';
import { KycService } from './kyc.service';
import { KycController } from './kyc.controller';
import { KYCEntity } from './entity/kyc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { AccountEntity } from '../accounts/entity/account.entity';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [LoggerModule, MessagingModule, TypeOrmModule.forFeature([AccountEntity]), TypeOrmModule.forFeature([KYCEntity])],
  controllers: [KycController],
  providers: [KycService],
})
export class KycModule {}
