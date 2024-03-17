import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {ProblemsService} from "./problems.service";
import {CreateProblemDto} from "./dto/create-problem.dto";
import {DeleteProblemDto} from "./dto/delete-problem.dto";
import {UpdateProblemDto} from "./dto/update-problem.dto";
import {ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Problem} from "./problem.model";


@Controller('problems')
@ApiTags('problems')
export class ProblemsController {
    constructor(private problemService: ProblemsService) {}

    @Post()
    @ApiOperation({
        summary: 'Create new problem',
        description: 'This endpoint creates new problem'
    })
    @ApiBody({
        description: 'Create new problem',
        type: CreateProblemDto
    })
    @ApiCreatedResponse({
        description: 'Problem created!',
        type: Problem
    })
    @ApiNotFoundResponse({
        description: 'Task not found',
        type: NotFoundException
    })
    async createProblem(@Body() dto: CreateProblemDto) {
        return await this.problemService.create(dto);
    }

    @Get('/:problem_id')
    @ApiOperation({
        summary: 'Get problem by id',
        description: 'This endpoint return array with problems or empty array'
    })
    @ApiOkResponse({
        description: 'Problem',
        type: Problem,
        isArray: true
    })
    async getProblem(@Param('problem_id') problem_id: number) {
        return await this.problemService.findProblem(problem_id);
    }

    @Get('/in-task/:task_id')
    @ApiOperation({
        summary: 'Get all problems in task',
        description: 'This endpoint return array with problems in task or empty array'
    })
    @ApiOkResponse({
        description: 'Problems in task',
        type: Problem,
        isArray: true
    })
    async getProblems(@Param('task_id') task_id: number) {
        return await this.problemService.findAll(task_id);
    }

    @Delete()
    @ApiOperation({
        summary: 'Delete problem with id',
        description: 'This endpoint deletes problem and return count of deleted rows'
    })
    @ApiBody({
        description: 'Delete problem',
        type: DeleteProblemDto
    })
    @ApiOkResponse({
        description: 'Count of deleted problems',
        type: Number
    })
    async deleteProblem(@Body() dto: DeleteProblemDto) {
        return await this.problemService.delete(dto);
    }

    @Put()
    @ApiOperation({
        summary: 'Update problem by id',
        description: 'This endpoint will update problem and return updated problem'
    })
    @ApiBody({
        description: 'Update some fields in problem',
        type: UpdateProblemDto
    })
    @ApiOkResponse({
        description: 'Problem updated successfully',
        type: Problem
    })
    @ApiNotFoundResponse({
        description: 'Task not found',
        type: NotFoundException
    })
    async updateProblem(@Body() dto: UpdateProblemDto) {
        return await this.problemService.update(dto);
    }
}
