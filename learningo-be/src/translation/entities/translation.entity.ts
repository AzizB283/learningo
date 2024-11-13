import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string;

  @Column()
  englishWord: string;

  @Column()
  translatedWord: string;

  @Column()
  pronounciation: string;

  @Column()
  difficultyLevel: string;
}
