import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

export const RateLimit = (limit: number, duration: number) => {
  return createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const key = req.ip; // Используйте IP-адрес клиента как ключ
    const now = Date.now();
    
    if (!req.rateLimit) {
      req.rateLimit = {};
    }

    if (!req.rateLimit[key]) {
      req.rateLimit[key] = { count: 1, timestamp: now };
    } else {
      const requestData = req.rateLimit[key];
      const timeDifference = now - requestData.timestamp;

      if (timeDifference > duration * 1000) {
        // Сбросьте счетчик, если время прошло
        req.rateLimit[key] = { count: 1, timestamp: now };
      } else {
        // Увеличьте счетчик
        requestData.count++;
        if (requestData.count > limit) {
          // Если лимит превышен, верните ошибку
          throw new HttpException('Too many requests', HttpStatus.TOO_MANY_REQUESTS);
        }
      }
    }
  })();
};
