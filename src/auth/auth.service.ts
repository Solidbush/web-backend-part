import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as process from "process";
import {AuthDto} from "./dto/auth.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(dto: AuthDto){
        const user = await this.userService.findUser(dto.email);
        if (user && await bcrypt.compare(dto.password, user.password)) {
            const payload = { id: user.id, email: user.email };
            return {
                access_token: await this.jwtService.signAsync(payload, {
                    secret: String(process.env.JWT_SECRET_KEY)
                }),
                payload: payload
            };
        }
        throw new UnauthorizedException();
    }
}
