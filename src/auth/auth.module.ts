import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from 'src/professores/entities/professor.entity';
import { JwtModule } from '@nestjs/jwt';
import { ProfessoresService } from 'src/professores/professores.service';
import { JwtStrategy } from './jwt-strategy';
import { ProfessorMapperImpl } from 'src/professores/mappers/professor.mapper.impl';
import { TokenInvalidoService } from 'src/token-invalido/token-invalido.service';
import { TokenInvalido } from 'src/token-invalido/entities/token-invalido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professor, TokenInvalido]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, ProfessoresService, JwtStrategy, ProfessorMapperImpl, TokenInvalidoService],
})
export class AuthModule { }
