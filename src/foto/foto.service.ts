import { BadRequestException, Injectable } from '@nestjs/common';
import { Professor } from 'src/professores/entities/professor.entity';
import { ProfessoresService } from 'src/professores/professores.service';

@Injectable()
export class FotoService {
    constructor(private professorService: ProfessoresService) {}
    async create(professor: Professor, file: Express.MulterS3.File) {
        if (!file) throw new BadRequestException();
        return await this.professorService.updateFoto(professor, file);
    }
}
