import { Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'DataNoFuturo' })
@Injectable()
export class DataNoFuturo implements ValidatorConstraintInterface {
    validate(data: Date): boolean {
        const hoje = new Date(Date.now());
        const dataAula = new Date(data);

        return hoje < dataAula ? true : false;
    }
    defaultMessage?(): string {
        return 'Data deve ser no futuro';
    }
}