// src/users/dto/user.dto.ts
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string; // Храните хешированный пароль
}
