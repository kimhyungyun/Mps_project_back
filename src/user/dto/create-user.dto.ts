import { IsString, IsEmail, IsEnum, Length } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {
  @IsString()
  @Length(4, 20)
  id: string;

  @IsString()
  @Length(2, 50)
  name: string;

  @IsString()
  @Length(2, 20)
  nickname: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  @Length(10, 11)
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;
} 