import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RateLimiterMiddleware } from './rate-limiter.middleware'; // Импортируйте middleware

@Module({
  imports: [
    RateLimiterModule.register({
      points: 100, // Глобальное ограничение в 100 запросов за час
      duration: 3600, // 1 час
      keyPrefix: 'global', // Префикс ключа
    }),
    TaskModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimiterMiddleware) // Подключение вашего middleware
      .forRoutes('*'); // Применить ко всем маршрутам
  }
}
