import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionEventDto } from './create-transaction-event.dto';

export class UpdateTransactionEventDto extends PartialType(CreateTransactionEventDto) {}
