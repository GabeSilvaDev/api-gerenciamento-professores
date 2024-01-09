import { IsNotEmpty, Length } from "class-validator";

export class ProfessorAuthRequestDto {
    @IsNotEmpty({ message: 'Email é obrigatorio' })
    email: string;

    @Length(6, 20, { message: 'Deve ter no minimo 6 e no máximo 20 caracteres' })
    password: string;
}