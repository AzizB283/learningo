import { IsString } from 'class-validator';

export class GetDataDto {
  @IsString()
  language: string;

  @IsString()
  difficultylevel: string;
}
