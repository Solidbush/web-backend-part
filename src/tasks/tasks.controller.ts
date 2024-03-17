import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {CreateTaskDto} from "./dto/create-task.dto";
import {Task} from "./task.model";
import {DeleteTaskDto} from "./dto/delete-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";

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
    async createParagraph(@Body() dto: CreateTaskDto) {
        return await this.taskService.create(dto);
    }

    @Get('/in-lesson/:lesson_id')
    @ApiOperation({
        summary: 'Get all tasks in lesson',
        description: 'This endpoint return array with tasks in lesson or empty array'
    })
    @ApiOkResponse({
        description: 'Tasks in lesson',
        type: Task,
        isArray: true
    })
    async getAllParagraphs(@Param('lesson_id') lesson_id: number) {
        return await this.taskService.getAll(lesson_id)
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
    async getChapter(@Param('task_id') task_id: number) {
        return await this.taskService.getTask(task_id);
    }

    @Delete()
    @ApiOperation({
        summary: 'Delete task with id',
        description: 'This endpoint deletes task and return count of deleted rows'
    })
    @ApiBody({
        description: 'Delete task',
        type: DeleteTaskDto
    })
    @ApiOkResponse({
        description: 'Count of deleted tasks',
        type: Number
    })
    async deleteParagraph(@Body() dto: DeleteTaskDto) {
        return await this.taskService.delete(dto);
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
    async updateParagraph(@Body() dto: UpdateTaskDto) {
        return await this.taskService.update(dto);
    }
}
