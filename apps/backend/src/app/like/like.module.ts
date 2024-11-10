import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaEntity } from '../database/entities/Persona.entity';
import { ActivityEntity } from '../database/entities/Activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonaEntity, ActivityEntity])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
