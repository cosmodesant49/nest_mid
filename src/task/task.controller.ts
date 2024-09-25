import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks() {
    return this.taskService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: TaskDto) {
    return this.taskService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: TaskDto) {
    return this.taskService.update(id, dto);
  }

  @Patch(':id/toggle')
  async toggleDone(@Param('id') id: string) {
    return this.taskService.toggleDone(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }

  @Get('filter/:isDone')
  async getFilteredTasks(@Param('isDone') isDone: string) {
    return this.taskService.getFilteredTasks(isDone === 'true');
  }
}
