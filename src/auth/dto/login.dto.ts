import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(4)
  id: string;

  @IsString()
  @MinLength(6)
  password: string;
} 