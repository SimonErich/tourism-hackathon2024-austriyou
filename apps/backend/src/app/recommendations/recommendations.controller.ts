import { Controller, Get } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService
  ) {}
  // For testing
  @Get()
  public async getRecommendations(): Promise<string> {
    const baseRecommandation =
      await this.recommendationsService.getRecommendationsByString('skiing', 5);

    const similarRecommandation =
      await this.recommendationsService.getSimilarEntries(
        baseRecommandation.ids[0],
        5
      );

    console.log('similarRecommandation', similarRecommandation.documents);

    return JSON.stringify(similarRecommandation);
  }
}
