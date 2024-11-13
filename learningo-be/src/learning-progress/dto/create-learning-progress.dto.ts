import { IsNumber, IsString } from 'class-validator';

export class CreateLearningProgressDto {
  @IsString()
  language: string;

  @IsString()
  difficultyLevel: string;

  @IsNumber()
  completePercentage: number;
}
