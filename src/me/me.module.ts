import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { ProfessorMapperImpl } from 'src/professores/mappers/professor.mapper.impl';

@Module({
  controllers: [MeController],
  providers: [MeService, ProfessorMapperImpl],
})
export class MeModule {}
