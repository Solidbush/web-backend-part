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
import {TasksService} from "./tasks.service";
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
import {CreateTaskDto} from "./dto/create-task.dto";
import {Task} from "./task.model";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {INTEGER} from "sequelize";
import {AuthGuard} from "../auth/auth.guard";

@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Post()
    @ApiOperation({
        summary: 'Create new task',
        description: 'This endpoint creates new task'
    })
    @ApiBody({
        description: 'Create new task',
        type: CreateTaskDto
    })
    @ApiCreatedResponse({
        description: 'Task created!',
        type: Task
    })
    @ApiNotFoundResponse({
        description: 'Lesson not found',
        type: NotFoundException
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @UseGuards(AuthGuard)
    async createParagraph(@Body() dto: CreateTaskDto) {
        return await this.taskService.create(dto);
    }

    @Get('/:task_id')
    @ApiOperation({
        summary: 'Get task by id',
        description: 'This endpoint return array with tasks or empty array'
    })
    @ApiOkResponse({
        description: 'Tasks',
        type: Task,
        isArray: true
    })
    @ApiNotAcceptableResponse({
        description: "Unreal id for task"
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @UseGuards(AuthGuard)
    async getChapter(@Param('task_id',
        new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) task_id: number) {
        return await this.taskService.getTask(task_id);
    }

    @Delete('/:task_id')
    @ApiOperation({
        summary: 'Delete task with id',
        description: 'This endpoint deletes task and return count of deleted rows'
    })
    @ApiBody({
        description: 'Delete task',
        type: INTEGER
    })
    @ApiOkResponse({
        description: 'Count of deleted tasks',
        type: Number
    })
    @ApiNotAcceptableResponse({
        description: "Unreal id for task"
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @UseGuards(AuthGuard)
    async deleteParagraph(@Param('task_id',
        new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) task_id: number) {
        return await this.taskService.delete(task_id);
    }

    @Put()
    @ApiOperation({
        summary: 'Update task by id',
        description: 'This endpoint will update task and return updated task'
    })
    @ApiBody({
        description: 'Update some fields in task',
        type: UpdateTaskDto
    })
    @ApiOkResponse({
        description: 'Task updated successfully',
        type: Task
    })
    @ApiNotFoundResponse({
        description: 'Lesson not found',
        type: NotFoundException
    })
    @ApiBadRequestResponse({
        description: 'Unreal request body for update task!',
        type: BadRequestException
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @UseGuards(AuthGuard)
    async updateParagraph(@Body() dto: UpdateTaskDto) {
        return await this.taskService.update(dto);
    }
}
