import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { IHttpExceptionResponse } from '../interfaces/http-exception-response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private getErrorMessage<T>(exception: T) {
    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();
      const errorMessage = (errorResponse as IHttpExceptionResponse).message || exception.message;
      return errorMessage;
    }
    return String(exception);
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: this.getErrorMessage(exception),
      method: request.method,
      path: request.url,
    });
  }
}
