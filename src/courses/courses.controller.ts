import {
    Body,
    Controller,
    Delete,
    Get, HttpStatus,
    NotFoundException,
    Param, ParseIntPipe,
    Post,
    Put, Query,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateCourseDto} from "./dto/create-course.dto";
import {CoursesService} from "./courses.service";
import {UpdateCourseDto} from "./dto/update-course.dto";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse, ApiNotAcceptableResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from "@nestjs/swagger";
import {Course} from "./course.model";
import {INTEGER} from "sequelize";


@Controller('courses')
@ApiTags('courses')
export class CoursesController {

    constructor(private courseService: CoursesService) {}
    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiOperation({
        summary: 'Create new course',
        description: 'This endpoint creates new course and returns created course in success way'
    })
    @ApiBody({
        description: 'Create new course',
        type: 'object',
        schema: {
            type: 'object',
            $ref: '$',
            properties: {
                name: {description: 'Course name', type: 'string'},
                description: {description: 'Course description', type: 'string'},
                img: {
                    description: 'Upload a image in .jpg format',
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiCreatedResponse({
        description: 'Course created!',
        type: Course
    })
    @ApiBadRequestResponse({
        description: 'Unreal request body for create course',
    })
    @UseInterceptors(FileInterceptor('image'))
    async createCourse(@Body() dto: CreateCourseDto, @UploadedFile() image) {
        return await this.courseService.create(dto, image)
    }

    @Get()
    @ApiOperation({
        summary: 'Get all courses on platform',
        description: 'This endpoint return array with all courses on platform'
    })
    @ApiOkResponse({
        description: 'Courses array',
        type: Course,
        isArray: true
    })
    @ApiBadRequestResponse({
        description: "Unreal query params for method"
    })
    async getAllCourses(
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        page = page ? Number(page) : 1;
        limit = limit ? Number(limit) : 10;
        return await this.courseService.getAll(page, limit);
    }

    @Get('/:course_id')
    @ApiOperation({
        summary: 'Get course by id',
        description: 'This endpoint return array with courses or empty array'
    })
    @ApiOkResponse({
        description: 'Courses',
        type: Course,
        isArray: true
    })
    @ApiNotAcceptableResponse({
        description: "Unreal id for course"
    })
    async getCourse(@Param('course_id',
        new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) course_id: number) {
        return await this.courseService.getCourse(course_id);
    }

    @Delete('/:course_id')
    @ApiOperation({
        summary: 'Delete course with id',
        description: 'This endpoint deletes course and return count of deleted rows'
    })
    @ApiBody({
        description: 'Delete course',
        type: INTEGER
    })
    @ApiOkResponse({
        description: 'Count of deleted courses',
        type: Number
    })
    @ApiNotAcceptableResponse({
        description: "Unreal id for course"
    })
    async deleteCourse(@Param('course_id',
        new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) course_id: number) {
        return await this.courseService.deleteCourse(course_id);
    }

    @Put()
    @ApiOperation({
        summary: 'Update course by id',
        description: 'This endpoint will update course and return updated course'
    })
    @ApiBody({
        description: 'Create new course',
        type: 'object',
        schema: {
            type: 'object',
            $ref: '$',
            properties: {
                course_id: {description: 'Course\'s id', example: 1},
                name: {description: 'Course name', type: 'string'},
                description: {description: 'Course description', type: 'string'},
                img: {
                    description: 'Upload a image in .jpg format',
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiOkResponse({
        description: 'Course updated successfully',
        type: Course
    })
    @ApiNotFoundResponse({
        description: 'Course not found',
        type: NotFoundException
    })
    @ApiBadRequestResponse({
        description: 'Unreal request body for update course',
    })
    @UseInterceptors(FileInterceptor('image'))
    async updateCourse(@Body() dto: UpdateCourseDto, @UploadedFile() image) {
        return await this.courseService.updateCourse(dto, image)
    }
}
