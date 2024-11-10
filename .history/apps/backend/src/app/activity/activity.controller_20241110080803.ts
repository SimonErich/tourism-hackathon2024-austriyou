import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Activity } from '@tasm/model';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get(':countryCode')
  async getActivities(
    @Param('countryCode') countryCode: string
  ): Promise<Activity[]> {
    return this.activityService.getActivities(countryCode);
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
