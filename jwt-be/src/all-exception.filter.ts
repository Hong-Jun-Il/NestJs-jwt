import { BaseExceptionFilter } from '@nestjs/core';
import { MyLoggerService } from './my-logger/my-logger.service';
import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const resObj = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      resObj.statusCode = exception.getStatus();
      resObj.response = exception.getResponse() as string;
    } else if (exception instanceof PrismaClientValidationError) {
      resObj.statusCode = 422;
      resObj.response = exception.message;
    } else if (exception instanceof Error) {
      resObj.response = exception.message.replaceAll(/\n/g, ' ');
    } else {
      resObj.response = 'Internal Server Error';
    }

    response.status(resObj.statusCode).json(resObj);
    this.logger.error(resObj.response, AllExceptionFilter.name);
    super.catch(exception, host);
  }
}
