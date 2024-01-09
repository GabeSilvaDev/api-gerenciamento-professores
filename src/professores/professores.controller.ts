import { Controller, Get, Post, Body, Patch, Delete, Query, Param, UseFilters } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
/* import { CreateProfessoreDto } from './dto/professor-response.dto'; */
import { ProfessorRequestDto } from './dto/professor-request.dto';
import { ValidationExceptionFilter } from 'src/common/validation-exception.filter';

@Controller('api/professores')
export class ProfessoresController {
  constructor(private readonly professoresService: ProfessoresService) { }

  @Post()
  @UseFilters(ValidationExceptionFilter)
  create(@Body() professorDto: ProfessorRequestDto) {
    return this.professoresService.create(professorDto);
  }

  @Get()
  async findAll(@Query('q') param: string) {
    return await this.professoresService.findAll(param);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.professoresService.findOne(+id);
  }

  /*   @Patch(':id')
    update(@Param('id') id: string, @Body() updateProfessoreDto: UpdateProfessoreDto) {
      return this.professoresService.update(+id, updateProfessoreDto);
    } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professoresService.remove(+id);
  }
}
