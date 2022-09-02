import { KycSchema, KycStatus } from '@fiatconnect/fiatconnect-types';

export class KycCreatedDto {
  public readonly id?: string;
  public readonly kycRequired: boolean;
  public readonly kycSchemaName?: KycSchema;
  public readonly status?: KycStatus;
  public readonly firstName: string;
  public readonly middleName?: string;
  public readonly email: string;
  public readonly lastName: string;
  public readonly dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  public readonly address: {
    address1: string;
    address2?: string;
    isoCountryCode: string;
    isoRegionCode: string;
    city: string;
    postalCode?: string;
  };
  public readonly phoneNumber: string;
  public readonly selfieDocument: string;
  public readonly identificationDocument: string;
  constructor(props: any) {
    this.address = props.address;
    this.middleName = props.middleName;
    this.dateOfBirth = props.dateOfBirth;
    this.id = props.id;
    this.kycRequired = props.kycRequired;
    this.selfieDocument = props.selfieDocument;
    this.kycSchemaName = props.kycSchemaName;
    this.lastName = props.lastName;
    this.firstName = props.firstName;
    this.identificationDocument = props.identificationDocument;
    this.status = props.status;
    this.email = props.email;
  }
}
