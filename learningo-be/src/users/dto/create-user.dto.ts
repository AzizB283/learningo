import { IsString } from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateUserDto {
  // @IsString()
  username?: string;

  @IsString()
  email: string;

  @IsString()
  password?: string;

  @IsString()
  displayname?: string;

  @IsString()
  userphoto?: string;
}
