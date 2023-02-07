import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

/**
 * Object(Entity)를 받아서 Serialized JSON으로
 */
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled
    // by the request handler
    // context: Information on the incoming request
    // handler: Kind of a reference to the request handler in our controller
    console.log('1) Im running before the handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        // data: User Entity object
        console.log('3) Im running before response is sent out', data);
        // plainToClass(Class, object): object를 받아 ClassTransformOptions rules에 따라 Class의 instance를 만들어 return(User Entity object -> UserDto instance)
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
