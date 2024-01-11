import { Aluno } from 'src/alunos/entities/aluno.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt'

@Entity()
export class Professor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, length: 100 })
  nome: string;

  @Column({ nullable: false, length: 255, unique: true })
  email: string;

  @Column()
  idade: number;

  @Column({ type: 'text', nullable: false })
  descricao: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  valorHora: number;

  @Column({ nullable: true, length: 255 })
  fotoPerfil: string;

  @Column({ nullable: false, length: 255 })
  password: string;

  @OneToMany(() => Aluno, (aluno) => aluno.professor, {
    cascade: ['remove'],
  })
  aluno: Aluno;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password?: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
