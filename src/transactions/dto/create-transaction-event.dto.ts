import { TransferStatus, TransferType } from '@fiatconnect/fiatconnect-types';

export class CreateTransactionEventDto {
  public readonly id?: string;
  public readonly account: any;
  public readonly accountId: string;
  public readonly amount: number;
  public readonly userId: string;

  public readonly metadata: any;
  public readonly currency: string;

  public readonly status?: TransferStatus;
  public readonly transferType: TransferType;

  constructor(
    id?: string,
    account?: any,
    userId?: string,
    amount?: number,
    currency?: string,
    status?: TransferStatus,
    metadata?: {},
    transferType?: TransferType,
  ) {
    this.account = account;
    this.amount = amount;
    this.userId = userId;
    this.id = id;
    this.status = status;
    this.metadata = metadata;
    this.transferType = transferType;
    this.currency = currency;
  }
}
