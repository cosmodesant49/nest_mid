// src/users/users.controller.ts
import { Controller, Get, Patch, Param, Body, Req, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User as PrismaUser } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): PrismaUser[] { // Метод для получения всех пользователей
    return this.usersService.findAll();
  }

  @Get('profile')
  getProfile(@Req() req): PrismaUser {
    return this.usersService.getProfile(req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto): PrismaUser {
    return this.usersService.update(id, userDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.usersService.delete(id);
  }
}
