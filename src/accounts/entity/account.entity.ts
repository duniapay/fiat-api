import { FiatAccountSchema, FiatAccountType, SupportedOperatorEnum } from '@fiatconnect/fiatconnect-types';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { KYCEntity } from '../../identities/entity/kyc.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'operator',
    type: 'enum',
    enum: SupportedOperatorEnum,
    nullable: true,
  })
  operator?: SupportedOperatorEnum;
  @Column({ name: 'institutionName', type: 'varchar', length: 255, nullable: true })
  institutionName: string;
  @Column({ name: 'accountName', type: 'varchar', length: 255 })
  accountName: string;
  @Column({ name: 'mobile', type: 'varchar', length: 255 })
  mobile?: string;
  @Column({ name: 'country', type: 'varchar', length: 255 })
  country: string;
  @Column({ name: 'accountNumber', type: 'varchar', length: 255, nullable: true })
  accountNumber?: string;

  @Column({ name: 'owner', type: 'varchar', length: 255 })
  owner: string;

  @ManyToOne(() => User, (user) => user.accounts)
  partner: User;

  @Column({
    name: 'fiatAccountType',
    type: 'enum',
    enum: FiatAccountType,
  })
  fiatAccountType: FiatAccountType;

  @Column({
    name: 'fiatAccountSchema',
    type: 'enum',
    enum: FiatAccountSchema,
  })
  fiatAccountSchema: FiatAccountSchema;

  @OneToMany(() => KYCEntity, (identity) => identity.account) // note: we will create author property in the Photo class below
  identities: KYCEntity[];
}
