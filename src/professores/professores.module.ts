import { Module } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import { ProfessoresController } from './professores.controller';
import { ProfessorMapperImpl } from './mappers/professor.mapper.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from './entities/professor.entity';
import { IsEmailExists } from 'src/validators/validator-email';

@Module({
  imports: [TypeOrmModule.forFeature([Professor])],
  controllers: [ProfessoresController],
  providers: [ProfessoresService, ProfessorMapperImpl, IsEmailExists],
})
export class ProfessoresModule {}
