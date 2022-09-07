import { TransferStatus, TransferType } from '@fiatconnect/fiatconnect-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDTO } from '../../domain/dto/basedto.interface';

export class CreateTransactionDto extends BaseDTO {
  @IsNotEmpty()
  accountId: string;
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  currency: string;
  @IsOptional()
  metadata: any;

  @IsOptional()
  status?: TransferStatus;
  @IsOptional()
  failure_reason?: string;
  @IsNotEmpty()
  transferType: TransferType;
}
