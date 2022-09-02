import { KycStatus } from '@fiatconnect/fiatconnect-types';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../accounts/entity/account.entity';
import { LoggerService } from '../logger/logger.service';
import { MessagingService } from '../messaging/messaging.service';
import { CreateKycDto } from './dto/create-kyc.dto';
import { KycCreatedDto } from './dto/kyc-created-event.dto';
import { KycUpdatedDto } from './dto/kyc-updated-event.dto';
import { UpdateKycDto } from './dto/update-kyc.dto';
import { KYCEntity } from './entity/kyc.entity';

@Injectable()
export class KycService {
  constructor(
    @InjectRepository(KYCEntity) private readonly repository: Repository<KYCEntity>,
    @InjectRepository(AccountEntity) private readonly accRepository: Repository<AccountEntity>,
    private readonly logger: LoggerService = new Logger(KycService.name),
    private readonly messagingService: MessagingService,
  ) {}

  async create(accountId: string, createKycDto: CreateKycDto): Promise<KYCEntity> {
    const { address, email, dateOfBirth, lastName, firstName, phoneNumber, kycSchemaName, selfieDocument, identificationDocument } =
      createKycDto;
    // Load account repository
    const account = await this.accRepository.findOneBy({ id: accountId });
    const entity = new KYCEntity();
    entity.address = address;
    entity.dateOfBirth = dateOfBirth;
    entity.kycSchemaName = kycSchemaName;
    entity.lastName = lastName;
    entity.firstName = firstName;
    entity.kycRequired = true;
    entity.mobile = phoneNumber;
    entity.status = KycStatus.KycPending;
    entity.email = email;
    entity.selfieDocument = selfieDocument;
    entity.identificationDocument = identificationDocument;
    const resp = await this.repository.save(entity);

    account.identities = [entity];

    this.accRepository.save(account);
    this.messagingService.publish(
      'identity.created',
      new KycCreatedDto({
        id: entity.id,
        address: { ...address },
        dateOfBirth,
        kycSchemaName,
        kycRequired: resp.kycRequired,
        lastName,
        firstName,
        status: entity.status,
        phoneNumber,
        selfieDocument,
        identificationDocument,
      }),
    );
    return entity;
  }

  async findAll(accountId: string): Promise<KYCEntity[]> {
    const accounts = await this.accRepository.findOne({
      where: {
        id: accountId,
      },
      relations: {
        identities: true,
      },
    });
    return accounts.identities;
  }

  async findOne(id: string): Promise<KYCEntity> {
    return this.repository.findOneBy({ id });
  }

  async update(accountId: string, id: string, updateKycDto: UpdateKycDto): Promise<boolean> {
    const entity = await this.repository.findOneBy({
      id,
    });
    const {
      address,
      email,
      status,
      dateOfBirth,
      lastName,
      firstName,
      phoneNumber,
      kycRequired,
      kycSchemaName,
      selfieDocument,
      identificationDocument,
    } = updateKycDto;
    entity.address = { ...address };
    entity.dateOfBirth = dateOfBirth;
    entity.kycSchemaName = kycSchemaName;
    entity.kycRequired = kycRequired;
    entity.lastName = lastName;
    entity.firstName = firstName;
    entity.status = status;
    entity.mobile = phoneNumber;
    entity.email = email;
    entity.selfieDocument = selfieDocument;
    entity.identificationDocument = identificationDocument;

    await this.repository.update({ id }, entity);
    this.messagingService.publish(
      'identity.updated',
      new KycUpdatedDto({
        id: entity.id,
        address: { ...address },
        dateOfBirth,
        kycSchemaName,
        kycRequired,
        lastName,
        firstName,
        status,
        phoneNumber,
        selfieDocument,
        identificationDocument,
      }),
    );

    return true;
  }

  async remove(id: string): Promise<KYCEntity> {
    const entity = await this.repository.findOneBy({ id });
    return this.repository.remove(entity);
  }
}
