import { Professor } from 'src/professores/entities/professor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Aluno {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Professor, (professor) => professor.aluno, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;

  @Column({ nullable: false, length: 100 })
  nome: string;

  @Column({ nullable: false, length: 255 })
  email: string;

  @Column({ type: 'datetime', nullable: false })
  dataAula: Date;

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
}
