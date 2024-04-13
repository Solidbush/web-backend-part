import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import * as process from 'process';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: String(process.env.JWT_SECRET_KEY),
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {
  constructor() {
    console.log(process.env.HOST);
  }
}
