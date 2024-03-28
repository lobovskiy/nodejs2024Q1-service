import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private loggingService: LoggingService) {}

  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = request;

    response.on('finish', () => {
      const { statusCode } = response;
      const message = `${method} ${originalUrl} - query: ${JSON.stringify(
        query,
      )}, body: ${JSON.stringify(body)} - ${statusCode}`;

      this.loggingService.log(message, 'LoggingMiddleware');
    });

    if (next) {
      next();
    }
  }
}
