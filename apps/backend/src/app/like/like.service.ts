import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonaEntity } from '../database/entities/Persona.entity';
import { Repository } from 'typeorm';
import { ActivityEntity } from '../database/entities/Activity.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(PersonaEntity)
    private personaRepository: Repository<PersonaEntity>,
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>
  ) {}

  public async createLike(uuid: string, activityId: number): Promise<void> {
    const persona = await this.personaRepository.findOne({
      where: { uuid: uuid },
    });

    if (!persona) throw new Error('Persona not found');

    const activity = await this.activityRepository
      .findOne({ where: { id: activityId } })
      .catch(() => null);

    if (!activity) throw new Error('Activity not found');

    // TODO: Implement the logic to add the activity to the persona's likes
  }
}
