import { Body, Controller, Post } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async createLike(
    @Body() body: { uuid: string; activityId: number }
  ): Promise<{ success: boolean }> {
    await this.likeService.createLike(body.uuid, body.activityId);
    return { success: true };
  }
}
