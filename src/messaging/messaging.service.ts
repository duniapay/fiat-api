import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, KafkaContext } from '@nestjs/microservices';
import { AccountService } from '../accounts/account.service';
import { KycCreatedDto } from '../identities/dto/kyc-created-event.dto';
import { KycUpdatedDto } from '../identities/dto/kyc-updated-event.dto';
import { KycService } from '../identities/kyc.service';
import { CreateTransactionEventDto } from '../transactions/dto/create-transaction-event.dto';
import { UpdateTransactionEventDto } from '../transactions/dto/update-transaction-event.dto';
import { TransactionService } from '../transactions/transaction.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class MessagingService {
  constructor(
    private userService: UsersService,
    private identity: KycService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    @Inject('IDENTITY_SERVICE') private readonly kycClient: ClientKafka,
    @Inject('PAYMNTS_SERVICE') private readonly paymentClient: ClientKafka, // private readonly kycService: KycService,
  ) {}

  async publishToTxTopic(topic: any, msg: CreateTransactionEventDto | UpdateTransactionEventDto) {
    return await this.paymentClient.emit(topic, { ...msg });
  }

  async publishToKycTopic(topic: any, msg: KycCreatedDto | KycUpdatedDto) {
    return await this.kycClient.emit(topic, { ...msg });
  }

  handleTXCompleted(topic: any, context: KafkaContext) {
    /// TODO: Request Status
    /// TODO: Update With Received Tx Details
    throw new Error('Method not implemented.');
  }
  handleTxApproved(topic: any, context: KafkaContext) {
    /// TODO: Debit Funds from User Account
    throw new Error('Method not implemented.');
  }

  handleKYCDenied(message: any, context: KafkaContext) {
    /// TODO: Update With Received KYC Details
    throw new Error('Method not implemented.');
  }
  handleKYCExpired(message: any, context: KafkaContext) {
    /// TODO: Update With Received KYC Details
    throw new Error('Method not implemented.');
  }
  handleKYCRejected(message: any, context: KafkaContext) {
    /// TODO: Update With Received KYC Details
    throw new Error('Method not implemented.');
  }
  handleKYCApproved(message: any, context: KafkaContext) {
    /// TODO: Update With Received KYC Details
    /// TODO: Update Account KYC Required status

    throw new Error('Method not implemented.');
  }
}
