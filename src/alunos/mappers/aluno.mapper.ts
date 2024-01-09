import { AlunoRequestDto } from "../dto/aluno-request.dto";
import { AlunoResponseDto } from "../dto/aluno-response.dto";
import { Aluno } from "../entities/aluno.entity";

export abstract class AlunoMapper {
    abstract toAlunoResponse(aluno: Aluno): AlunoResponseDto
    abstract toAlunoEntity (alunoDto: AlunoRequestDto): Aluno;
}