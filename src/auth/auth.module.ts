import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from 'src/professores/entities/professor.entity';
import { JwtModule } from '@nestjs/jwt';
import { ProfessoresService } from 'src/professores/professores.service';
import { JwtStrategy } from './jwt-strategy';
import { ProfessorMapperImpl } from 'src/professores/mappers/professor.mapper.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Professor]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, ProfessoresService, JwtStrategy, ProfessorMapperImpl],
})
export class AuthModule { }
