import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonaModule } from './persona/persona.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { SqliteModule } from './database/sqlite.module';
import { LikeModule } from './like/like.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    PersonaModule,
    RecommendationsModule,
    LikeModule,
    ActivityModule,
    SqliteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
