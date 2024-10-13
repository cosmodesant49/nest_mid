import { Controller, Get, Patch, Param, Body, Req, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User as PrismaUser } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<PrismaUser[]> {
    return this.usersService.findAll();
  }

  @Get('profile')
  async getProfile(@Req() req): Promise<PrismaUser> {
    return this.usersService.getProfile(req.user.id); // Предполагается, что req.user.id — это int
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() userDto: UserDto): Promise<PrismaUser> {
    return this.usersService.update(parseInt(id, 10), userDto);
  }
  
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(parseInt(id, 10));
  }
  
}
