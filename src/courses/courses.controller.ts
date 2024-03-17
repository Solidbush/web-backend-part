import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateCourseDto} from "./dto/create-course.dto";
import {CoursesService} from "./courses.service";
import {DeleteCourseDto} from "./dto/delete-course.dto";
import {UpdateCourseDto} from "./dto/update-course.dto";
import {
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from "@nestjs/swagger";
import {Course} from "./course.model";


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
    async getAllCourses() {
        return await this.courseService.getAll();
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
    async getCourse(@Param('course_id') course_id: number) {
        return await this.courseService.getCourse(course_id);
    }

    @Delete()
    @ApiOperation({
        summary: 'Delete course with id',
        description: 'This endpoint deletes course and return count of deleted rows'
    })
    @ApiBody({
        description: 'Delete course',
        type: DeleteCourseDto
    })
    @ApiOkResponse({
        description: 'Count of deleted courses',
        type: Number
    })
    async deleteCourse(@Body() dto: DeleteCourseDto) {
        return await this.courseService.deleteCourse(dto);
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
    @UseInterceptors(FileInterceptor('image'))
    async updateCourse(@Body() dto: UpdateCourseDto, @UploadedFile() image) {
        return await this.courseService.updateCourse(dto, image)
    }
}
