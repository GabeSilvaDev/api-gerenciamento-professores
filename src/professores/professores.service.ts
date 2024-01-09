import { Injectable } from '@nestjs/common';
import { ProfessorResponseDto } from './dto/professor-response.dto';
import { ProfessorMapperImpl } from './mappers/professor.mapper.impl';
import { Like, Repository } from 'typeorm';
import { Professor } from './entities/professor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessorNotFoundException } from './exceptions/professor-not-found-exception';
import { ProfessorRequestDto } from './dto/professor-request.dto';

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

  update(id: number) {
    return `This action updates a #${id} professore`;
  }

  remove(id: number) {
    return `This action removes a #${id} professore`;
  }
}
