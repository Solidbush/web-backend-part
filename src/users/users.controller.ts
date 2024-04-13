import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get, HttpStatus,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put, UseGuards
} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {SubscribeOnCourseDto} from "./dto/subscribe-on-course.dto";
import {UnsubscribeFromCourseDto} from "./dto/unsubscribe-from-course.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiBody,
    ApiConflictResponse,
    ApiCreatedResponse, ApiNotAcceptableResponse,
    ApiNotFoundResponse,
    ApiOkResponse, ApiOperation,
    ApiTags, ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {User} from "./user.model";
import {UserCourses} from "../courses/user-courses.model";
import {INTEGER} from "sequelize";
import {AuthGuard} from "../auth/auth.guard";

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    @ApiOperation({
        summary: 'Create new user',
        description: 'This endpoint creates new user and returns created user in success way'
    })
    @ApiBody({
        description: 'Create a new user',
        type: CreateUserDto,
    })
    @ApiCreatedResponse({
        description: 'User has been successfully created',
        isArray: false,
        type: User
    })
    @ApiConflictResponse({
        description: 'User with the same email already exists',
        schema: {
            example: {
                message: "User with the same email: user@mail.ru already exists",
                error: "Conflict",
                statusCode: 409
            }
        }
    })
    @ApiBadRequestResponse({
        description: 'Unreal request body',
    })
    create(@Body() userDto: CreateUserDto){
        return this.userService.createUser(userDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all users',
        description: 'This endpoint returns all users on platform (includes admin)'
    })
    @ApiOkResponse({
        description: 'Get all users',
        isArray: true,
        type: User
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async getAll(){
        return this.userService.getAllUsers();
    }

    @Post('/subscribe')
    @ApiOperation({
        summary: 'Subscribe on course',
        description: 'This endpoint subscribes user on course'
    })
    @ApiBody({
        description: 'Subscribe on course',
        type: SubscribeOnCourseDto,
    })
    @ApiCreatedResponse({
        description: 'User subscribed on course',
        type: UserCourses
    })
    @ApiNotFoundResponse({
        description: 'User not found',
        type: NotFoundException
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async subscribeOnCourse(@Body() dto: SubscribeOnCourseDto) {
        return await this.userService.subscribe(dto);
    }

    @Post('/unsubscribe')
    @ApiOperation({
        summary: 'Unsubscribe user from course',
        description: 'This endpoint unsubscribes user from course'
    })
    @ApiBody({
        description: 'Unsubscribe from course',
        type: UserCourses,
    })
    @ApiNotFoundResponse({
        description: 'User not found',
        type: NotFoundException
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async unsubscribeFromCourse(@Body() dto: UnsubscribeFromCourseDto) {
        return await this.userService.unsubscribe(dto);
    }

    @Delete('/:user_id')
    @ApiOperation({
        summary: 'Delete user',
        description: 'This endpoint deletes user from platform'
    })
    @ApiBody({
        description: 'Delete user',
        type: INTEGER,
    })
    @ApiOkResponse({
        description: 'Count of deleted rows',
    })
    @ApiNotAcceptableResponse({
        description: "Unreal id for user"
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async deleteUser(@Param('user_id',
        new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) user_id: number) {
        return await this.userService.delete(user_id);
    }

    @Put()
    @ApiOperation({
        summary: 'Ban or unban user',
        description: 'This endpoint bans or unbans user on platform (depends on using fields)'
    })
    @ApiBody({
        description: 'Ban or unban user',
        type: BanUserDto
    })
    @ApiNotFoundResponse({
        description: 'User not found',
        type: NotFoundException
    })
    @ApiOkResponse({
        description: 'User banned or unbanned successfully',
        type: User
    })
    @ApiBadRequestResponse({
        description: 'Response should contains ban_reason or unban_reason field!',
        type: BadRequestException
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async banUser(@Body() dto: BanUserDto) {
        return await this.userService.ban(dto);
    }

    @Get('/:user_id/comments')
    @ApiOperation({
        summary: 'Get user\'s comments',
        description: 'This endpoint returns all comments by user id'
    })
    @ApiOkResponse({
        description: 'Get all comments',
        isArray: true,
        type: User
    })
    @ApiNotAcceptableResponse({
        description: "Unreal id for user"
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async getUserComments(@Param('user_id',
        new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) user_id: number){
        return await this.userService.getComments(user_id);
    }

    @Get('/:user_id/courses')
    @ApiOperation({
        summary: 'Get user\'s courses',
        description: 'This endpoint returns all user\'s courses by user id'
    })
    @ApiOkResponse({
        description: 'Get all user\'s courses',
        isArray: true,
        type: UserCourses
    })
    @ApiNotAcceptableResponse({
        description: "Unreal id for user"
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async getUserCourses(@Param('user_id',
        new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) user_id: number){
        return await this.userService.getCourses(user_id);
    }
}
