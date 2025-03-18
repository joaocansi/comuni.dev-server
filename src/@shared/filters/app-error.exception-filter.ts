import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { AppError, getStatusCode } from '../errors/app-error';

@Catch(AppError)
export class AppErrorExceptionFilter implements ExceptionFilter {
  catch(exception: AppError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { message, type } = exception;
    const status = getStatusCode(type);

    response.status(status).json({
      status,
      type: exception.type,
      message,
    });
  }
}
