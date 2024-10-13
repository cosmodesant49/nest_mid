import { Controller, Get, Patch, Param, Body, Req, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User as PrismaUser } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): PrismaUser[] { // Метод для получения всех пользователей
    return this.usersService.findAll();
  }

  @Get('profile')
  getProfile(@Req() req): PrismaUser {
    return this.usersService.getProfile(req.user.id); // Убедитесь, что req.user.id также int
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() userDto: UserDto): PrismaUser { // Измените на number
    return this.usersService.update(id, userDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): void { // Измените на number
    this.usersService.delete(id);
  }
}
