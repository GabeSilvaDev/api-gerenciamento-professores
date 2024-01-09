import { ProfessorRequestDto } from '../dto/professor-request.dto';
import { ProfessorResponseDto } from '../dto/professor-response.dto';
import { Professor } from '../entities/professor.entity';
import { ProfessorMapper } from './professor.mapper';

export class ProfessorMapperImpl implements ProfessorMapper {
  toProfessorResponse(professor: Professor): ProfessorResponseDto {
    const professorDto = new ProfessorResponseDto();
    professorDto.id = professor.id;
    professorDto.nome = professor.nome;
    professorDto.email = professor.email;
    professorDto.idade = professor.idade;
    professorDto.descricao = professor.descricao;
    professorDto.fotoPerfil = professor.fotoPerfil;
    professorDto.valorHora = professor.valorHora;
    professorDto.createdAt = professor.createdAt;
    professorDto.updatedAt = professor.updatedAt;

    return professorDto;
  }

  toProfessorEntity(professorDto: ProfessorRequestDto): Professor {
    const professor = new Professor();
    professor.nome = professorDto.nome;
    professor.email = professorDto.email;
    professor.idade = professorDto.idade;
    professor.descricao = professorDto.descricao;
    professor.valorHora = professorDto.valorHora;
    professor.password = professorDto.password;

    return professor;
  }
}
