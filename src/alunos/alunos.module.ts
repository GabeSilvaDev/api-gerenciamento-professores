import { Module } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { AlunosController } from './alunos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { Professor } from 'src/professores/entities/professor.entity';
import { AlunoMapperImpl } from './mappers/aluno.mapper-impl';

@Module({
  imports: [TypeOrmModule.forFeature([Professor, Aluno])],
  controllers: [AlunosController],
  providers: [AlunosService, AlunoMapperImpl],
})
export class AlunosModule {}
