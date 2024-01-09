import { Injectable } from '@nestjs/common';
import { AlunoResponseDto } from './dto/aluno-response.dto';
import { AlunoRequestDto } from './dto/aluno-request.dto';
import { Repository } from 'typeorm';
import { Professor } from 'src/professores/entities/professor.entity';
import { Aluno } from './entities/aluno.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AlunoMapperImpl } from './mappers/aluno.mapper-impl';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
    private alunoMapper: AlunoMapperImpl,
  ) { }
  async create(AlunoRequestDto: AlunoRequestDto, professorId: number) {
    const professor = await this.professorRepository.findOneBy({ id: professorId });
    const aluno = this.alunoMapper.toAlunoEntity(AlunoRequestDto);
    aluno.professor = professor;
    const alunoSalvo = await this.alunoRepository.save(aluno);
    return this.alunoMapper.toAlunoResponse(alunoSalvo);
  }

  findAll() {
    return `This action returns all alunos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aluno`;
  }

  /*   update(id: number, updateAlunoDto: AlunoRequestDto) {
      return `This action updates a #${id} aluno`;
    } */

  remove(id: number) {
    return `This action removes a #${id} aluno`;
  }
}
