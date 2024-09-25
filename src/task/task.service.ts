import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { Task } from './entities/task.entity';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService){}

    async getById(id:string){
      const task = await this.prisma.task.findUnique({
        where:{
          id: +id


        }})

        if (!task) throw new NotFoundException('Task not found')
          return task
    }

    getAll(){
      return this.prisma.task.findMany()
    }
    create(dto:TaskDto){
      return this.prisma.task.create({
        data: dto
      })
    }
    async toggleDone(id:string){
    const task = await this.getById(id)
     
    return this.prisma.task.update({
      
      where: {
        id: task.id,
      },
      data:{
      
      isDone: !task.isDone
    },
  })
}
}
