import { KycStatus, TransferStatus } from '@fiatconnect/fiatconnect-types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class MessagingService {
  constructor(@Inject('any_name_i_want') private readonly client: ClientKafka) {}

  public async publish(topic: string, msg: {}) {
    console.log(`Received message:`, msg);
    return this.client.emit(topic, { payload: JSON.stringify(msg) });
  }
}
