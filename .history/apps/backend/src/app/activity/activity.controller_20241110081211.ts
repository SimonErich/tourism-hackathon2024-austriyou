import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Activity } from '@tasm/model';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async getActivities(
    @Query('countryCode') countryCode: string
  ): Promise<Activity[]> {
    console.log('mikado: ', countryCode);
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
