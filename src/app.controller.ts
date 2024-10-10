import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RateLimit } from 'nestjs-rate-limiter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Ограничение на 2 запроса за 30 секунд для этого маршрута
  @RateLimit({ points: 2, duration: 30 })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
