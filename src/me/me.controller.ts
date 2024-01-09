import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { MeService } from './me.service';
import { ProfessorMapperImpl } from 'src/professores/mappers/professor.mapper.impl';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Professor } from 'src/professores/entities/professor.entity';
import { MeExceptionFilter } from './me-exception.filter';

@Controller('api/me')
export class MeController {
  constructor(private readonly meService: MeService, private mapper: ProfessorMapperImpl) { }

  @Get()
  @UseFilters(MeExceptionFilter)
  @UseGuards(AuthGuard('jwt'))
  me(@GetUser() professor: Professor) {
    return this.mapper.toProfessorResponse(professor);
  }
}
