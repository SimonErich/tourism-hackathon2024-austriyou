import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonaModule } from './persona/persona.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
// import { PocketBaseService } from './database/pocketbase.service';

@Module({
  imports: [PersonaModule, RecommendationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
