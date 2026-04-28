import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch() // Catches everything: HttpExceptions AND regular system Errors
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    // 1. Determine Status Code
    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // 2. Extract Message Safely
    let errorMessage: string | object = 'Internal Server Error';
    
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      // NestJS often puts the message in an object like { message: "...", error: "..." }
      errorMessage = typeof res === 'object' ? (res as any).message : res;
    } else if (exception instanceof Error) {
      errorMessage = exception.message;
    }

    // 3. Send Unified Response
    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      error: errorMessage,
    });
  }
}