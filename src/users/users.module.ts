import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller'; // Добавляем импорт контроллера

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController], // Добавляем контроллер сюда
  exports: [UsersService],
})
export class UsersModule {}
