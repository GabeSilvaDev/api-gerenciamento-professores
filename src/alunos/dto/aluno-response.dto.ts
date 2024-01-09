import { Expose } from "class-transformer";

export class AlunoResponseDto {
    id: number;
    nome: string;
    email: string;
    @Expose({ name: 'data_aula' })
    dataAula: Date;
    @Expose({ name: 'created_at' })
    createdAt: Date;
    @Expose({ name: 'updated_at' })
    updateAt: Date;
}
