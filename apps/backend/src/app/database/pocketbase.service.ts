import { Injectable } from '@nestjs/common';
import PocketBase from 'pocketbase';

@Injectable()
export class PocketBaseService {
  private readonly pocketBaseClient = new PocketBase(
    process.env.POCKETBASE_HOST
  );

  client(): PocketBase {
    return this.pocketBaseClient;
  }
}
