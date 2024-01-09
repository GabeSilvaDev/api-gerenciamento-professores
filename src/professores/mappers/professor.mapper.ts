import { ProfessorResponseDto } from '../dto/professor-response.dto';
import { Professor } from '../entities/professor.entity';

export abstract class ProfessorMapper {
  abstract toProfessorResponse(professor: Professor): ProfessorResponseDto;
}
