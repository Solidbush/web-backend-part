import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthGuard} from "./auth.guard";
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {AuthDto} from "./dto/auth.dto";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiOperation({
        summary: 'Login user',
        description: 'This endpoint for login user and give token for him'
    })
    @ApiBody({
        description: 'Auth body',
        type: AuthDto,
    })
    @ApiOkResponse({
        description: "User login successfully"
    })
    @ApiCreatedResponse({
        description: "Token created successfully"
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    signIn(@Body() dto: AuthDto) {
        return this.authService.signIn(dto);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('profile')
    @ApiOperation({
        summary: 'Check user\'s token',
        description: 'This endpoint for check token'
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    async getProfile(@Request() req) {
        return await req.user;
    }
}
