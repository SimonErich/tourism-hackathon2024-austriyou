import { Injectable } from '@nestjs/common';
import { ActivityEntity } from '../database/entities/Activity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '@tasm/model';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>
  ) {}
  public async getActivities(): Promise<ActivityEntity[]> {
    return await this.activityRepository.find();
  }

  public async createActivity(
    name: string,
    description: string
  ): Promise<void> {
    await this.activityRepository.save({
      name,
      description,
    });
  }
}
