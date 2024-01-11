import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length, Max, Min } from "class-validator";
import { Match } from "src/validators/validator-password";

export class ProfessorUpdateDto {
    @IsString({ message: 'Nome deve ser uma string' })
    @Length(3, 100, { message: 'Nome deve ter de 3 até 100 caracteres' })
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    nome: string;

    @IsEmail({}, { message: 'Email inválido' })
    @IsNotEmpty({ message: "Email não pode ser vazio" })
    email: string;

    @Max(100, { message: "Idade deve ter no máximo 100" })
    @Min(18, { message: "Idade deve ser no minimo 18" })
    @IsNotEmpty({ message: "Idade não pode ser vazio" })
    idade: number;

    @Length(10, 500, { message: "Descrição deve ter no minimo 10 caracteres e no maximo 500 caracteres" })
    @IsNotEmpty({ message: "Descrição não pode ser vazio" })
    descricao: string;

    @Expose({ name: 'valor_hora' })
    @IsNotEmpty({ message: "Valor Hora não pode ser vazio" })
    @Max(500, { message: "Valor hora deve ter no máximo 500" })
    @Min(10, { message: "Valor hora deve ser no minimo 10" })
    valorHora: number;

    @IsNotEmpty({ message: "Senha não pode ser vazio" })
    @Length(6)
    password: string;

    @Expose({ name: 'password_confirmation' })
    @IsNotEmpty({ message: "Senha de Confirmação não pode ser vazio" })
    @Length(6)
    @Match('password')
    passwordConfirmation: string;
}
