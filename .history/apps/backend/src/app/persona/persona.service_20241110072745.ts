import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PersonaEntity } from '../database/entities/Persona.entity';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(PersonaEntity)
    private personaRepository: Repository<PersonaEntity>
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

  public async getPersonas(): Promise<PersonaEntity[]> {
    return await this.personaRepository.find();
  }

  public async getPersonaById(id: string): Promise<PersonaEntity> {
    return await this.personaRepository.findOne({ where: { uuid: id } });
  }
}
