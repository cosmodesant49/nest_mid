import { Controller, Get, Patch, Param, Body, Req, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User as PrismaUser } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@Req() req): PrismaUser { // Используем правильный тип
    return this.usersService.getProfile(req.user.id); // Здесь req.user.id должен быть строкой
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto): PrismaUser { // Изменяем тип id на string
    return this.usersService.update(id, userDto); // Здесь мы передаем строку
  }

  @Delete(':id')
  delete(@Param('id') id: string): void { // Изменяем тип id на string
    this.usersService.delete(id); // Вызываем метод удаления пользователя
  }
}
