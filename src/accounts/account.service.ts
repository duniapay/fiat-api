import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger/logger.service';
import { User } from '../users/entities/user.entity';

import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entity/account.entity';
import { AccountRepository } from './repository/account.repository';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity) private readonly repository: Repository<AccountEntity>,
    private readonly logger: LoggerService = new Logger(AccountService.name),
  ) {}
  async create(createAccountDto: CreateAccountDto) {
    const entity = new AccountEntity();

    entity.accountName = createAccountDto.accountName;
    entity.institutionName = createAccountDto.institutionName;
    entity.accountNumber = createAccountDto.accountNumber;
    entity.fiatAccountSchema = createAccountDto.fiatAccountSchema;
    entity.fiatAccountType = createAccountDto.fiatAccountType;
    entity.country = createAccountDto.country;
    entity.mobile = createAccountDto.mobile;
    entity.operator = createAccountDto.operator;
    entity.owner = createAccountDto.ownerId;
    return this.repository.save(entity);
  }

  async findAll() {
    await this.repository.find().then((data) => {
      return data;
    });
  }

  async findOne(id: string) {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const entity = new AccountEntity();
    entity.accountName = updateAccountDto.accountName;
    entity.institutionName = updateAccountDto.institutionName;
    entity.accountNumber = updateAccountDto.accountNumber;
    entity.fiatAccountSchema = updateAccountDto.fiatAccountSchema;
    entity.fiatAccountType = updateAccountDto.fiatAccountType;
    entity.mobile = updateAccountDto.mobile;
    entity.operator = updateAccountDto.operator;
    entity.owner = updateAccountDto.ownerId;
    return this.repository.update(
      {
        id,
      },
      entity,
    );
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });
    await this.repository.remove(entity).then(() => {
      return true;
    });
  }
}
