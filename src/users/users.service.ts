import { Injectable, NotFoundException } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private readonly users: PrismaUser[] = [];

  create(createUserDto: UserDto): PrismaUser {
    const newUser = { id: uuidv4(), ...createUserDto } as PrismaUser; 
    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<PrismaUser | undefined> {
    return this.users.find(user => user.email === email);
  }

  getProfile(userId: string): PrismaUser {
    const user = this.users.find(user => user.id === userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: string, userDto: UserDto): PrismaUser {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.email = userDto.email;
    user.password = userDto.password;
    return user;
  }

  delete(id: string): void {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(index, 1); // Удаляем пользователя из массива
  }
}
