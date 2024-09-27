// src/users/users.controller.ts
import { Controller, Get, Patch, Param, Body, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User as PrismaUser } from '@prisma/client'; // Убедитесь, что импортируете тип User правильно

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@Req() req): PrismaUser { // Убедитесь, что используете правильный тип
    return this.usersService.getProfile(req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto): PrismaUser { // Измените id на string
    return this.usersService.update(id, userDto);
  }
}
