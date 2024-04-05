import {ApiProperty} from "@nestjs/swagger";

export class UpdateTaskDto {
    @ApiProperty({description: 'Task\'s id', example: 1})
    readonly task_id: number;
    @ApiProperty({description: 'Task\'s title', example: 'Hello world', required: false})
    readonly title?: string;
    @ApiProperty({description: 'Lesson\'s id', example: 1, required: false})
    readonly lesson_id?: number;
}