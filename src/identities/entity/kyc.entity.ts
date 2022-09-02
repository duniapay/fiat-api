import { KycSchema, KycStatus } from '@fiatconnect/fiatconnect-types';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { AccountEntity } from '../../accounts/entity/account.entity';

@Entity()
export class KYCEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'kycRequired', type: 'bool' })
  kycRequired: boolean;

  @Column({
    name: 'kycSchemaName',
    type: 'enum',
    enum: KycSchema,
  })
  kycSchemaName?: KycSchema;

  @Column({
    name: 'status',
    type: 'enum',
    enum: KycStatus,
  })
  status?: KycStatus;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  middleName?: string;
  @Column({ type: 'varchar', length: 255 })
  lastName: string;
  @Column('simple-json')
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };

  @Column('simple-json')
  address: {
    address1: string;
    address2?: string;
    isoCountryCode: string;
    isoRegionCode: string;
    city: string;
    postalCode?: string;
  };
  @Column({ type: 'varchar', length: 255 })
  mobile: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;
  @Column({ type: 'varchar', length: 255 })
  selfieDocument: string;
  @Column({ type: 'varchar', length: 255 })
  identificationDocument: string;

  @ManyToOne(() => AccountEntity, (account) => account.identities)
  account: AccountEntity;
}
