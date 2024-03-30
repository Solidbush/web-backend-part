import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus, NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put
} from '@nestjs/common';
import {LessonsService} from "./lessons.service";
import {CreateLessonDto} from "./dto/create-lesson.dto";
import {UpdateLessonDto} from "./dto/update-lesson.dto";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiNotAcceptableResponse, ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from "@nestjs/swagger";
import {Lesson} from "./lesson.model";
import {INTEGER} from "sequelize";


@Controller('lessons')
@ApiTags('lessons')
export class LessonsController {
    constructor(private lessonService: LessonsService) {}

    @Post()
    @ApiOperation({
        summary: 'Create new lesson',
        description: 'This endpoint creates new lesson'
    })
    @ApiBody({
        description: 'Create new lesson',
        type: CreateLessonDto
    })
    @ApiOkResponse({
        description: 'Created lesson',
        type: Lesson
    })
    @ApiBadRequestResponse({
        description: 'Unreal request body for update lesson',
        type: BadRequestException
    })
    @ApiNotFoundResponse({
        description: 'Course not found',
        type: NotFoundException
    })
    async createLesson(@Body() dto: CreateLessonDto) {
        return await this.lessonService.create(dto);
    }

    @Get('/:lesson_id')
    @ApiOperation({
        summary: 'Get lesson by id',
        description: 'This endpoint return array with Lessons or empty array'
    })
    @ApiOkResponse({
        description: 'Lessons',
        type: Lesson,
        isArray: true
    })
    async getLesson(@Param('lesson_id') lesson_id: number){
        return await this.lessonService.getLesson(lesson_id);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all lessons',
        description: 'This endpoint return array with Lessons or empty array'
    })
    @ApiOkResponse({
        description: 'Lessons',
        type: Lesson,
        isArray: true
    })
    async getAllLessons() {
        return await this.lessonService.allLessons();
    }

    @Delete('/:lesson_id')
    @ApiOperation({
        summary: 'Delete lessons by id',
        description: 'This endpoint deletes lessons and return count of deleted rows'
    })
    @ApiBody({
        description: 'Delete lesson',
        type: INTEGER
    })
    @ApiOkResponse({
        description: 'Count of deleted lessons',
        type: Number
    })
    @ApiNotAcceptableResponse({
        description: "Unreal id for lesson"
    })
    async deleteLesson(@Param('lesson_id',
        new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) lesson_id: number) {
        return await this.lessonService.delete(lesson_id);
    }

    @Put()
    @ApiOperation({
        summary: 'Update lesson by id',
        description: 'This endpoint updates lesson and returns lessons array'
    })
    @ApiBody({
        description: 'Update lesson dto',
        type: UpdateLessonDto
    })
    @ApiOkResponse({
        description: 'Updated lessons array',
        type: Lesson,
    })
    @ApiBadRequestResponse({
        description: 'Unreal request body for update lesson',
        type: BadRequestException
    })
    async updateLesson(@Body() dto: UpdateLessonDto) {
        return await this.lessonService.update(dto);
    }
}
