import { Body, Controller, Get, Post } from '@nestjs/common';
import { Activity } from '@tasm/model';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async getActivities(): Promise<Activity[]> {
    return this.activityService.getActivities();
  }

  @Post()
  async createActivity(
    @Body() body: { name: string; description: string }
  ): Promise<{ success: boolean }> {
    await this.activityService.createActivity(body.name, body.description);
    return {
      success: true,
    };
  }
}
