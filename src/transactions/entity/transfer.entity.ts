import { TransferStatus, TransferType } from '@fiatconnect/fiatconnect-types';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class TransferEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fiatAccountId', type: 'varchar', length: 255 })
  fiatAccountId: string;

  @Column({})
  amount: number;
  @Column({ type: 'simple-json' })
  metadata: {
    transferAddress?: string;
    quote: any;
    fee: number;
  };

  @Column({
    name: 'transferStatus',
    type: 'enum',
    enum: TransferStatus,
  })
  status?: TransferStatus;

  @Column({
    name: 'transferType',
    type: 'enum',
    enum: TransferType,
  })
  transferType?: TransferType;
}
