import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {LessonsService} from "./lessons.service";
import {CreateLessonDto} from "./dto/create-lesson.dto";
import {UpdateLessonDto} from "./dto/update-lesson.dto";
import {DeleteLessonDto} from "./dto/delete-lesson.dto";
import {ApiBody, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Lesson} from "./lesson.model";


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

    @Get('/in-course/:course_id')
    @ApiOperation({
        summary: 'Get lessons in course by course\'s id',
        description: 'This endpoint return array with lessons or empty array'
    })
    @ApiOkResponse({
        description: 'Lessons',
        type: Lesson,
        isArray: true
    })
    async getLessons(@Param('course_id') course_id: number) {
        return await this.lessonService.getAll(course_id);
    }

    @Delete()
    @ApiOperation({
        summary: 'Delete lessons by id',
        description: 'This endpoint deletes lessons and return count of deleted rows'
    })
    @ApiBody({
        description: 'Delete lesson',
        type: DeleteLessonDto
    })
    @ApiOkResponse({
        description: 'Count of deleted lessons',
        type: Number
    })
    async deleteLesson(@Body() dto: DeleteLessonDto) {
        return await this.lessonService.delete(dto);
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
    async updateLesson(@Body() dto: UpdateLessonDto) {
        return await this.lessonService.update(dto);
    }
}
