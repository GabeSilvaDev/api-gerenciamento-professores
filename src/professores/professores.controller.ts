import { Controller, Get, Post, Body, Patch, Delete, Query, Param, UseFilters, Put, UseGuards, HttpCode } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
/* import { CreateProfessoreDto } from './dto/professor-response.dto'; */
import { ProfessorRequestDto } from './dto/professor-request.dto';
import { ValidationExceptionFilter } from 'src/common/validation-exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Professor } from './entities/professor.entity';
import { ProfessorUpdateDto } from './dto/professor-update.dto';
import { ProfessorExceptionFilter } from './exceptions/professor-exception.filter';

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

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(ValidationExceptionFilter)
  async update(@GetUser() user: Professor,
    @Body() updateProfessorDto: ProfessorUpdateDto,
  ) {
    return this.professoresService.update(user.id, updateProfessorDto);
  }

  @Delete()
  @HttpCode(204)
  @UseFilters(ProfessorExceptionFilter)
  @UseGuards(AuthGuard('jwt'))
  remove(@GetUser() user: Professor) {
    return this.professoresService.remove(user.id);
  }
}
