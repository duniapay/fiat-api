import { KycSchema, KycStatus } from '@fiatconnect/fiatconnect-types';
import { BaseModel } from '../../domain/model/base.model';

export class KycModel extends BaseModel {
  kycRequired: boolean;
  email: string;

  kycSchemaName?: KycSchema;

  status?: KycStatus;

  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };

  address: {
    address1: string;
    address2?: string;
    isoCountryCode: string;
    city: string;
    postalCode?: string;
  };
  phoneNumber: string;
  selfieDocument: string;
  identificationDocument: string;
}
