import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Professor } from "src/professores/entities/professor.entity";
import { Repository } from "typeorm";

@ValidatorConstraint({ name: 'IsEmailExists', async: true })
@Injectable()
export class IsEmailExists implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(Professor)
        private professorRepository: Repository<Professor>,
    ) { }
    async validate(email: string): Promise<boolean> {
        const emailExists = await this.professorRepository.findOneBy({ email: email });

        return !emailExists ? true : false;
    }
    defaultMessage?(): string {
        return 'E-mail já cadastrado';
    }

}