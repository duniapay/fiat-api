import { TransferStatus } from '@fiatconnect/fiatconnect-types';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { AccountEntity } from '../accounts/entity/account.entity';
import { LoggerService } from '../logger/logger.service';
import { MessagingService } from '../messaging/messaging.service';
import { CreateTransactionEventDto } from './dto/create-transaction-event.dto';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionEventDto } from './dto/update-transaction-event.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransferEntity } from './entity/transfer.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransferEntity) private readonly repository: Repository<TransferEntity>,
    @InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>,
    private readonly logger: LoggerService = new Logger(TransactionService.name),
    private readonly messagingService: MessagingService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { accountId, amount, currency, metadata, transferType } = createTransactionDto;
    const entity = new TransferEntity();
    entity.fiatAccountId = accountId;
    entity.amount = amount;
    entity.transferType = transferType;
    entity.metadata = metadata;
    entity.currency = currency;

    entity.status = TransferStatus.TransferStarted;
    const query = {
      where: {
        id: createTransactionDto.accountId,
      },
    } as FindOneOptions<AccountEntity>;
    const account = await this.accountRepository.findOne(query);
    let res;
    if (account) {
      console.log(account);
      res = await this.repository.save(entity);
      await this.messagingService.publish(
        'transaction.created',
        new CreateTransactionEventDto(
          res.id,
          {
            accountId,
            institutionName: account.institutionName,
            accountName: account.accountName,
            country: account.country,
            mobile: account.mobile,
            accountNumber: account.accountNumber,
            fiatAccountType: account.fiatAccountType,
            fiatAccountSchema: account.fiatAccountSchema,
          },
          account.owner,
          amount,
          entity.currency,
          entity.status,
          metadata,
          transferType,
        ),
      );
    } else {
      throw new HttpException(`Invalid accountId ${createTransactionDto.accountId}`, 404);
    }

    return res;
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const entity = new TransferEntity();
    const { accountId, amount, metadata, status, transferType } = updateTransactionDto;
    const query = {
      where: {
        id,
      },
    } as FindOneOptions<TransferEntity>;
    const tx = await this.repository.findOne(query);

    // don not update if already
    if (tx.status !== TransferStatus.TransferStarted) {
      throw new HttpException(`Transaction already processed with id ${id}`, 400);
    }

    entity.fiatAccountId = accountId;
    entity.amount = amount;
    entity.metadata = metadata;
    entity.status = status ?? TransferStatus.TransferStarted;
    entity.transferType = transferType;
    const query1 = {
      where: {
        id,
      },
    } as FindOptionsWhere<TransferEntity>;
    await this.repository.update(query1, entity);

    const query2 = {
      where: {
        id: accountId,
      },
    } as FindOneOptions<AccountEntity>;
    const account = await this.accountRepository.findOne(query2);

    this.messagingService.publish(
      'transaction.updated',
      new UpdateTransactionEventDto(
        entity.id,
        {
          accountId,
          institutionName: account.institutionName,
          accountName: account.accountName,
          country: account.country,
          mobile: account.mobile,
          accountNumber: account.accountNumber,
          fiatAccountType: account.fiatAccountType,
          fiatAccountSchema: account.fiatAccountSchema,
        },
        account.owner,
        amount,
        entity.currency,
        entity.status,
        metadata,
        transferType,
      ),
    );

    return true;
  }

  async remove(id: string) {
    const query = {
      where: {
        id,
      },
    } as FindOptionsWhere<TransferEntity>;
    const entity = await this.repository.findOneBy(query);
    await this.repository.remove(entity);
    return true;
  }
}
