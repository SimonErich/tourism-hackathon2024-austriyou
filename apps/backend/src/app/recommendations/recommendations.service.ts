import { Injectable } from '@nestjs/common';

@Injectable()
export class RecommendationsService {
  public async getRecommendations(): Promise<unknown> {
    return [];
  }
}
