import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AccountEntity } from '../../accounts/entity/account.entity';
import { TransferEntity } from '../../transactions/entity/transfer.entity';
import { Role } from '../enums/role.enum';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  firstname: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Column({ type: 'varchar', length: 255 })
  salt: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  mobile: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  business_name: string;

  @Column({ type: 'simple-json', nullable: true })
  address: {
    country: string;
    city: string;
    postalCode?: string;
    address: string;
  };

  @Column()
  balance: number;

  @Column({ type: 'varchar', length: 255 })
  currency: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.standard,
  })
  roles: Role[];

  // currenciesAccount
  // fiatAccounts

  @OneToMany(() => AccountEntity, (photo) => photo.partner) // note: we will create author property in the Photo class below
  accounts: AccountEntity[];

  // transactions
  @OneToMany(() => TransferEntity, (photo) => photo.partner) // note: we will create author property in the Photo class below
  transactions: TransferEntity[];
}
