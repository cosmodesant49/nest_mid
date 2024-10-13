import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'; // Импортируем bcrypt

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10); // Хэшируем пароль
    const newUser = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });
    return newUser;
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (user && await bcrypt.compare(loginDto.password, user.password)) {
      return user; // Возвращаем пользователя при успешной аутентификации
    }
    return null;
  }
}
