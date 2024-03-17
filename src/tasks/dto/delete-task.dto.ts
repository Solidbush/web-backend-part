import {ApiProperty} from "@nestjs/swagger";

export class DeleteTaskDto {
    @ApiProperty({description: 'Task\'s id', example: 1})
    readonly task_id: number;
}