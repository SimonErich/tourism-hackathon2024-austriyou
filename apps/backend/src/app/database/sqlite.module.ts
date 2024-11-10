import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaEntity } from './entities/Persona.entity';
import { ActivityEntity } from './entities/Activity.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      entities: [PersonaEntity, ActivityEntity],
      synchronize: true,
    }),
  ],
})
export class SqliteModule {}
