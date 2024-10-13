import { Injectable, NotFoundException } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly users: PrismaUser[] = [];
  private idCounter = 1; // Счетчик для генерации ID

  create(createUserDto: UserDto): PrismaUser {
    const newUser = { id: this.idCounter++, ...createUserDto } as PrismaUser; 
    this.users.push(newUser);
    return newUser;
  }

  findAll(): PrismaUser[] {
    return this.users; // Возвращаем всех пользователей
  }

  async findByEmail(email: string): Promise<PrismaUser | undefined> {
    return this.users.find(user => user.email === email);
  }

  getProfile(userId: number): PrismaUser { // Измените на number
    const user = this.users.find(user => user.id === userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: number, userDto: UserDto): PrismaUser { // Измените на number
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.email = userDto.email;
    user.password = userDto.password;
    return user;
  }

  delete(id: number): void { // Измените на number
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(index, 1); // Удаляем пользователя из массива
  }
}
