import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Lesson } from './lesson.model';
import { INTEGER } from 'sequelize';
import { AuthGuard } from '../auth/auth.guard';

@Controller('lessons')
@ApiTags('lessons')
export class LessonsController {
  constructor(private lessonService: LessonsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new lesson',
    description: 'This endpoint creates new lesson',
  })
  @ApiBody({
    description: 'Create new lesson',
    type: CreateLessonDto,
  })
  @ApiOkResponse({
    description: 'Created lesson',
    type: Lesson,
  })
  @ApiBadRequestResponse({
    description: 'Unreal request body for update lesson',
    type: BadRequestException,
  })
  @ApiNotFoundResponse({
    description: 'Course not found',
    type: NotFoundException,
  })
  @ApiUnauthorizedResponse({
    description: 'Problems with authorization token',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async createLesson(@Body() dto: CreateLessonDto) {
    return await this.lessonService.create(dto);
  }

  @Get('/:lesson_id')
  @ApiOperation({
    summary: 'Get lesson by id',
    description: 'This endpoint return array with Lessons or empty array',
  })
  @ApiOkResponse({
    description: 'Lessons',
    type: Lesson,
    isArray: true,
  })
  @ApiNotAcceptableResponse({
    description: 'Unreal id for lesson',
  })
  @ApiUnauthorizedResponse({
    description: 'Problems with authorization token',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getLesson(
    @Param(
      'lesson_id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    lesson_id: number,
  ) {
    return await this.lessonService.getLesson(lesson_id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all lessons',
    description: 'This endpoint return array with Lessons or empty array',
  })
  @ApiOkResponse({
    description: 'Lessons',
    type: Lesson,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Problems with authorization token',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getAllLessons() {
    return await this.lessonService.allLessons();
  }

  @Delete('/:lesson_id')
  @ApiOperation({
    summary: 'Delete lessons by id',
    description:
      'This endpoint deletes lessons and return count of deleted rows',
  })
  @ApiBody({
    description: 'Delete lesson',
    type: INTEGER,
  })
  @ApiOkResponse({
    description: 'Count of deleted lessons',
    type: Number,
  })
  @ApiNotAcceptableResponse({
    description: 'Unreal id for lesson',
  })
  @ApiUnauthorizedResponse({
    description: 'Problems with authorization token',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteLesson(
    @Param(
      'lesson_id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    lesson_id: number,
  ) {
    return await this.lessonService.delete(lesson_id);
  }

  @Put()
  @ApiOperation({
    summary: 'Update lesson by id',
    description: 'This endpoint updates lesson and returns lessons array',
  })
  @ApiBody({
    description: 'Update lesson dto',
    type: UpdateLessonDto,
  })
  @ApiOkResponse({
    description: 'Updated lessons array',
    type: Lesson,
  })
  @ApiBadRequestResponse({
    description: 'Unreal request body for update lesson',
    type: BadRequestException,
  })
  @ApiUnauthorizedResponse({
    description: 'Problems with authorization token',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async updateLesson(@Body() dto: UpdateLessonDto) {
    return await this.lessonService.update(dto);
  }
}
