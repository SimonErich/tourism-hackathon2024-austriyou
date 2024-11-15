import { Body, Controller, Get, Post } from '@nestjs/common';
import { Persona } from '@tasm/model';
import { PersonaService } from './persona.service';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  public async createPersona(
    @Body() body: { country: string }
  ): Promise<{ uuid: string }> {
    return this.personaService.createPersona(body.country);
  }

  @Get()
  public async getPersonas(): Promise<Persona[]> {
    return await this.personaService.getPersonas();
  }
}
