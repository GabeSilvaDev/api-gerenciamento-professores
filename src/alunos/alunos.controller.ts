import { Controller, Get, Post, Body, Param, UseFilters, UseGuards } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { AlunoRequestDto } from './dto/aluno-request.dto';
import { ValidationExceptionFilter } from 'src/common/validation-exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Professor } from 'src/professores/entities/professor.entity';

@Controller('api')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) { }

  @Get('professores/alunos')
  @UseGuards(AuthGuard('jwt'))
  findAlunosByProfessor(@GetUser() professor: Professor) {
    return this.alunosService.findByProfessor(professor)
  }

  @Post('/professores/:id/alunos')
  @UseFilters(ValidationExceptionFilter)
  create(
    @Body() AlunoRequestDto: AlunoRequestDto,
    @Param('id') professorId: number,
  ) {
    return this.alunosService.create(AlunoRequestDto, professorId);
  }
}
