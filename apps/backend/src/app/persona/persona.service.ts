import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
// import { PocketBaseService } from '../database/pocketbase.service';

@Injectable()
export class PersonaService {
  public async createPersona(country: string): Promise<{ uuid: string }> {
    const personaUid = uuidv4();

    return { uuid: personaUid };
  }

  public async getPersona(): Promise<{ uuid: string; country: string }[]> {
    return [];
  }
}
