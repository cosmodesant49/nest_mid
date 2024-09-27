import { Injectable, NotFoundException } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client'; // Импортируем тип User
import { UserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid'; // Используем для генерации уникальных строковых ID

@Injectable()
export class UsersService {
  private readonly users: PrismaUser[] = []; 

  create(createUserDto: UserDto): PrismaUser {
    const newUser = { id: uuidv4(), ...createUserDto } as PrismaUser; // Генерируем строковый ID
    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<PrismaUser | undefined> {
    return this.users.find(user => user.email === email);
  }

  getProfile(userId: string): PrismaUser { // userId должен быть строкой
    const user = this.users.find(user => user.id === userId); // Сравниваем строки
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: string, userDto: UserDto): PrismaUser { // id должен быть строкой
    const user = this.users.find(user => user.id === id); // Сравниваем строки
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.email = userDto.email;
    user.password = userDto.password;
    return user;
  }
}
