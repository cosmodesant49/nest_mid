import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';


@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(){
    return this.taskService.getAll()
  }
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: TaskDto){
    return this.taskService.create(dto)
  }
  @Patch(':id')
  async toggleDone(@Param('id') id:string){
    return this.taskService.toggleDone(id)
  }
}
