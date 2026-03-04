import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/common/interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  private readonly DEFAULT_MESSAGES: Record<string, string> = {
    POST: 'Created successfully',
    PATCH: 'Updated successfully',
    PUT: 'Updated successfully',
    GET: 'Retrieved successfully',
    DELETE: 'Deleted successfully',
  };

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    return next.handle().pipe(
      map((data: unknown) => {
        if (
          data &&
          typeof data === 'object' &&
          'message' in data &&
          'success' in data
        ) {
          return data as ApiResponse<T>;
        }
        let responseMessage = this.DEFAULT_MESSAGES[request.method];
        if (data && typeof data === 'object' && 'message' in data) {
          const { message, ...rest } = data;
          responseMessage = message as string;

          data = Object.keys(rest).length > 0 ? rest : undefined;
        }
        if (data && typeof data === 'object' && 'data' in data) {
          const { data: record, ...rest } = data as {
            data: T;
            [key: string]: unknown;
          };
          data = record;
          if (Object.keys(rest).length > 0) {
            return {
              success: true,
              message: responseMessage,
              data,
              path: request.url,
            } as ApiResponse<T>;
          }
        }
        return {
          success: true,
          message: responseMessage,
          data,
          path: request.url,
        } as ApiResponse<T>;
      }),
    );
  }
}
