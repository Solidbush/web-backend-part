import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import {Observable, tap} from 'rxjs';
import {HttpService} from "@nestjs/axios";
import {map} from "rxjs/operators";

@Injectable()
export class TimeResponseInterceptor implements NestInterceptor {
  constructor(private readonly httpService: HttpService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    return next
        .handle()
        .pipe(
            map(() => { return {...request.data, headers: {...request.headers, time: `${Date.now() - now}`}}}),
            tap(() => console.log(`After... ${Date.now() - now}ms`))
        )
  }
}
