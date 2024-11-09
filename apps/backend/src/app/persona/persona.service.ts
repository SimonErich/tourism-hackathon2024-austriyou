import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Persona } from '../database/entities/Persona.entity';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona) private personaRepository: Repository<Persona>
  ) {}
  public async createPersona(country: string): Promise<{ uuid: string }> {
    const personaUid = uuidv4();

    await this.personaRepository
      .save({
        uuid: personaUid,
        country,
      })
      .then(() => console.log('Created Persona'))
      .catch((error) => {
        console.log('Failed to save persona', error);
      });

    return { uuid: personaUid };
  }

  public async getPersonas(): Promise<Persona[]> {
    return await this.personaRepository.find();
  }
}
