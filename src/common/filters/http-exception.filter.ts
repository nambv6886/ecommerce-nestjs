import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Resource } from '../../app.resource';
import { ResponseMessage } from '../../models/interfaces/response.message.model';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      switch (status) {
        case 403:
          response.status(status).json(new ResponseMessage({
            status: 403,
            messageCode: 'AUTHORIZATION_FORBIDDEN_RESOURCE',
            message: Resource.AUTHORIZATION_FORBIDDEN_RESOURCE,
          }));
          break;
        case 400:
          response.status(status).json(new ResponseMessage({
            status: 400,
            messageCode: 'BAD_REQUEST',
            message: exception.message,
          }));
          break;
        default:
          response.status(status).json(new ResponseMessage({
            status: status,
            message: exception.message,
          }));
      }
    } else {
      response.json(exception.message);
    }
  }
}

