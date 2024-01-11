import { Module } from '@nestjs/common';
import { FotoService } from './foto.service';
import { FotoController } from './foto.controller';
import { ProfessoresService } from 'src/professores/professores.service';
import { ProfessorMapperImpl } from 'src/professores/mappers/professor.mapper.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from 'src/professores/entities/professor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professor])],
  controllers: [FotoController],
  providers: [FotoService, ProfessoresService, ProfessorMapperImpl],
})
export class FotoModule {}
