import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get(':id')
  public async getPersona(@Param('id') id: string): Promise<Persona> {
    return await this.personaService.getPersonaById(id);
  }
}
