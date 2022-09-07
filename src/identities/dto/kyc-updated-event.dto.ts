import { PartialType } from '@nestjs/mapped-types';
import { KycCreatedDto } from './kyc-created-event.dto';

export class KycUpdatedDto extends PartialType(KycCreatedDto) {}
