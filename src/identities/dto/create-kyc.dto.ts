import { KycSchema, KycStatus } from '@fiatconnect/fiatconnect-types';
import { IsOptional, IsNotEmpty, ValidateNested, IsEmail } from 'class-validator';
import { BaseDTO } from '../../domain/dto/basedto.interface';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';
import { DayOfBirthDto } from './dob.dto';

export class CreateKycDto extends BaseDTO {
  @IsOptional()
  kycRequired: boolean;
  @IsNotEmpty()
  kycSchemaName?: KycSchema;
  @IsOptional()
  status?: KycStatus;
  @IsNotEmpty()
  firstName: string;
  @IsOptional()
  middleName?: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DayOfBirthDto)
  dateOfBirth: DayOfBirthDto;

  @IsNotEmpty()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsNotEmpty()
  phoneNumber: string;
  @IsNotEmpty()
  selfieDocument: string;
  @IsNotEmpty()
  identificationDocument: string;
}
