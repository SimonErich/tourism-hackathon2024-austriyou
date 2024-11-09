import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonaModule } from './persona/persona.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { SqliteModule } from './database/sqlite.module';

@Module({
  imports: [PersonaModule, RecommendationsModule, SqliteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
