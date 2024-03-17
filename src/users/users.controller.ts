import {BadRequestException, Body, Controller, Delete, Get, NotFoundException, Post, Put} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {SubscribeOnCourseDto} from "./dto/subscribe-on-course.dto";
import {UnsubscribeFromCourseDto} from "./dto/unsubscribe-from-course.dto";
import {DeleteUserDto} from "./dto/delete-user.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse, ApiOperation,
    ApiTags
} from "@nestjs/swagger";
import {User} from "./user.model";
import {UserCourses} from "../courses/user-courses.model";

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
    getAll(){
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
    async unsubscribeFromCourse(@Body() dto: UnsubscribeFromCourseDto) {
        return await this.userService.unsubscribe(dto);
    }

    @Delete()
    @ApiOperation({
        summary: 'Delete user',
        description: 'This endpoint deletes user from platform'
    })
    @ApiBody({
        description: 'Delete user',
        type: DeleteUserDto,
    })
    @ApiOkResponse({
        description: 'Count of deleted rows',
    })
    async deleteUser(@Body() dto: DeleteUserDto) {
        return await this.userService.delete(dto);
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
    async banUser(@Body() dto: BanUserDto) {
        return await this.userService.ban(dto);
    }
}
