import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const DEFAULT_INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message
        : DEFAULT_INTERNAL_SERVER_ERROR_MESSAGE;

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
