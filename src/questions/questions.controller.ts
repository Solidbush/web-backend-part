import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {QuestionsService} from "./questions.service";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {DeleteQuestionDto} from "./dto/delete-question.dto";
import {UpdateQuestionDto} from "./dto/update-question.dto";
import {ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Question} from "./question.model";

@Controller('questions')
@ApiTags('questions')
export class QuestionsController {
    constructor(private questionService: QuestionsService) {}

    @Post()
    @ApiOperation({
        summary: 'Create new question',
        description: 'This endpoint creates new question'
    })
    @ApiBody({
        description: 'Create new question',
        type: CreateQuestionDto
    })
    @ApiCreatedResponse({
        description: 'Question created!',
        type: Question
    })
    @ApiNotFoundResponse({
        description: 'Task not found',
        type: NotFoundException
    })
    async createQuestion(@Body() dto: CreateQuestionDto) {
        return await this.questionService.create(dto);
    }

    @Get('/:question_id')
    @ApiOperation({
        summary: 'Get question by id',
        description: 'This endpoint return array with questions or empty array'
    })
    @ApiOkResponse({
        description: 'Questions',
        type: Question,
        isArray: true
    })
    async getQuestion(@Param('question_id') question_id: number) {
        return await this.questionService.findQuestion(question_id);
    }

    @Get('/in-task/:task_id')
    @ApiOperation({
        summary: 'Get all questions in task',
        description: 'This endpoint return array with questions in task or empty array'
    })
    @ApiOkResponse({
        description: 'Questions in task',
        type: Question,
        isArray: true
    })
    async getQuestions(@Param('task_id') task_id: number) {
        return await this.questionService.findAll(task_id);
    }

    @Delete()
    @ApiOperation({
        summary: 'Delete question with id',
        description: 'This endpoint deletes question and return count of deleted rows'
    })
    @ApiBody({
        description: 'Delete question',
        type: DeleteQuestionDto
    })
    @ApiOkResponse({
        description: 'Count of deleted questions',
        type: Number
    })
    async deleteQuestion(@Body() dto: DeleteQuestionDto) {
        return await this.questionService.delete(dto);
    }

    @Put()
    @ApiOperation({
        summary: 'Update question by id',
        description: 'This endpoint will update question and return updated question'
    })
    @ApiBody({
        description: 'Update some fields in question',
        type: UpdateQuestionDto
    })
    @ApiOkResponse({
        description: 'Question updated successfully',
        type: Question
    })
    @ApiNotFoundResponse({
        description: 'Task not found',
        type: NotFoundException
    })
    async updateQuestion(@Body() dto: UpdateQuestionDto) {
        return await this.questionService.update(dto);
    }
}
