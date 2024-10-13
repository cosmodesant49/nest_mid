import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  private requests = new Map<string, { count: number; timestamp: number }>();

  use(req: any, res: any, next: () => void) {
    const key = req.ip; // Используйте IP-адрес клиента как уникальный ключ
    const now = Date.now();

    // Установите лимиты
    const limit = 5; // 5 запросов
    const windowTime = 60 * 1000; // 1 минута

    if (!this.requests.has(key)) {
      this.requests.set(key, { count: 1, timestamp: now });
    } else {
      const requestData = this.requests.get(key);
      const timeDifference = now - requestData.timestamp;

      if (timeDifference > windowTime) {
        // Сбросьте счетчик, если время прошло
        this.requests.set(key, { count: 1, timestamp: now });
      } else {
        // Увеличьте счетчик
        requestData.count++;
        if (requestData.count > limit) {
          // Если лимит превышен, верните ошибку
          throw new HttpException('Too many requests', HttpStatus.TOO_MANY_REQUESTS);
        }
      }
    }
    
    next();
  }
}
