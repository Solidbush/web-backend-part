import {Controller, Get, Headers, UseInterceptors} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {map} from "rxjs/operators";
import {TimeResponseInterceptor} from "./time-response.interceptor";

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get('send-request')
  @UseInterceptors(TimeResponseInterceptor)
  sendRequest(@Headers() headers){
    const auth = headers?.auth || null;
    return this.httpService.get("http://localhost:5000/get-request")
        .pipe(map((response) => response.data));
  }

  @Get('get-request')
  @UseInterceptors(TimeResponseInterceptor)
  getRequest(@Headers() headers): string {
    return headers;
  }
}
