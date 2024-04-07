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
import {QuestionsService} from "./questions.service";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {UpdateQuestionDto} from "./dto/update-question.dto";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNotAcceptableResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags, ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {Question} from "./question.model";
import {INTEGER} from "sequelize";
import {AuthGuard} from "../auth/auth.guard";

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
    @ApiBadRequestResponse({
        description: 'Unreal response body for create question!',
        type: BadRequestException
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @UseGuards(AuthGuard)
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
    @ApiNotAcceptableResponse({
        description: "Unreal id for question"
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @UseGuards(AuthGuard)
    async getQuestion(@Param('question_id',
        new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) question_id: number) {
        return await this.questionService.findQuestion(question_id);
    }


    @Delete('/:question_id')
    @ApiOperation({
        summary: 'Delete question with id',
        description: 'This endpoint deletes question and return count of deleted rows'
    })
    @ApiBody({
        description: 'Delete question',
        type: INTEGER
    })
    @ApiOkResponse({
        description: 'Count of deleted questions',
        type: Number
    })
    @ApiNotAcceptableResponse({
        description: "Unreal id for question"
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @UseGuards(AuthGuard)
    async deleteQuestion(@Param('question_id',
        new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) question_id: number) {
        return await this.questionService.delete(question_id);
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
    @ApiBadRequestResponse({
        description: 'Unreal response body for update question!',
        type: BadRequestException
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @UseGuards(AuthGuard)
    async updateQuestion(@Body() dto: UpdateQuestionDto) {
        return await this.questionService.update(dto);
    }
}
