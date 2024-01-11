import { Injectable } from '@nestjs/common';
import { ProfessorResponseDto } from './dto/professor-response.dto';
import { ProfessorMapperImpl } from './mappers/professor.mapper.impl';
import { Like, Repository } from 'typeorm';
import { Professor } from './entities/professor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessorNotFoundException } from './exceptions/professor-not-found-exception';
import { ProfessorRequestDto } from './dto/professor-request.dto';
import * as bcrypt from 'bcrypt';
import { ProfessorUpdateDto } from './dto/professor-update.dto';
import { ProfessorMailExistsException } from './exceptions/professor-mail-exists-exception';

@Injectable()
export class ProfessoresService {
  constructor(private professorMapper: ProfessorMapperImpl,
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
  ) { }
  async create(ProfessorRequestDto: ProfessorRequestDto) {
    const professor = this.professorMapper.toProfessorEntity(ProfessorRequestDto);
    const professorSalvo = await this.professorRepository.save(professor);
    return this.professorMapper.toProfessorResponse(professorSalvo);
  }

  async findAll(param: string) {
    if (!param) param = '';
    const professores = await this.professorRepository.find({
      where: {
        descricao: Like(`%${param}%`),
      }
    });

    return professores.map((professor) =>
      this.professorMapper.toProfessorResponse(professor),
    );
  }

  async findOne(id: number) {
    try {
      const professor = await this.professorRepository.findOneByOrFail({
        id: id,
      });
      return this.professorMapper.toProfessorResponse(professor);
    } catch (error) {
      if (error.name === 'EntityNotFoundError') {
        throw new ProfessorNotFoundException();
      }
    }
  }

  async findOneByEmail(email: string) {
    return await this.professorRepository.findOneBy({
      email: email,
    });
  }

  async update(id: number, updateProfessorDto: ProfessorUpdateDto) {
    try {
      const professor = this.professorMapper.toProfessorEntity(updateProfessorDto);
      professor.password = await this.hashSenha(updateProfessorDto.password);
      await this.professorRepository.update(id, professor);
      const professorAtualizado = await this.findOneByEmail(updateProfessorDto.email);
      return this.professorMapper.toProfessorResponse(professorAtualizado);
    } catch (error) {
      if (error.driverError.errno === 1062) {
        throw new ProfessorMailExistsException();
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} professore`;
  }

  private async hashSenha(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }
}
