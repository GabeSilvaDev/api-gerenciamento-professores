import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { AlunoResponseDto } from './dto/aluno-response.dto';
import { AlunoRequestDto } from './dto/aluno-request.dto';
import { ValidationExceptionFilter } from 'src/common/validation-exception.filter';

@Controller('api')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) { }

  @Post('/professores/:id/alunos')
  @UseFilters(ValidationExceptionFilter)
  create(
    @Body() AlunoRequestDto: AlunoRequestDto,
    @Param('id') professorId: number,
  ) {
    return this.alunosService.create(AlunoRequestDto, professorId);
  }

  @Get()
  findAll() {
    return this.alunosService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alunosService.remove(+id);
  }
}
