import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class LearningProgress {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'userId' })
  @Column()
  userId: number;

  @Column()
  language: string;

  @Column()
  difficultyLevel: string;

  @Column()
  completionPercentage: number;
}
