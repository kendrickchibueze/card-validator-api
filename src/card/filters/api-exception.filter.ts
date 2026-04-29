import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch() 
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage: string | object = 'Internal Server Error';
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      errorMessage = typeof res === 'object' ? (res as any).message : res;
    } else if (exception instanceof Error) {
      errorMessage = exception.message;
    }
    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      error: errorMessage,
    });
  }
}