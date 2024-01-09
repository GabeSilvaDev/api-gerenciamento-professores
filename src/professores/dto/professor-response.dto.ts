import { Expose } from "class-transformer";

export class ProfessorResponseDto {
  id: number;
  nome: string;
  email: string;
  idade: number;
  descricao: string;

  @Expose({ name: 'valor_hora' })
  valorHora: number;

  @Expose({ name: 'foto_perfil' })
  fotoPerfil: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
