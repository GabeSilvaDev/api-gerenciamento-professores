import { Expose } from "class-transformer";
import { IsDateString, IsEmail, IsNotEmpty, Length, Validate } from "class-validator";
import { DataNoFuturo } from "src/validators/validator-date";

export class AlunoRequestDto {
    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    @Length(3, 100, { message: 'Nome deve ter no minimo 3 caracteres e no maximo 100 caracteres' })
    nome: string;

    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @IsDateString({}, { message: 'Data Inválida' })
    @Validate(DataNoFuturo)
    @Expose({ name: 'data_aula'})
    dataAula: Date;
}
