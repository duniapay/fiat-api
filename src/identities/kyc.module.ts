import { Module } from '@nestjs/common';
import { KycService } from './kyc.service';
import { KycController } from './kyc.controller';
import { KYCEntity } from './entity/kyc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KYCRepository } from './repository/KYC.repository';
import { dbConfig } from '../config/database';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [KYCEntity],
    }),
  ],
  controllers: [KycController],
  providers: [KycService, KYCRepository],
})
export class KycModule {}
