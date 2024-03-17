import {ApiProperty} from "@nestjs/swagger";

export class UpdateQuestionDto {
    @ApiProperty({description: 'Question\'s id', example: 1})
    readonly question_id: number;
    @ApiProperty({description: 'Question\'s info', example: 'Hello world', required: false})
    readonly info?: string;
    @ApiProperty({description: 'Question\'s answer', example: 'Hello world', required: false})
    readonly answers?: string;
    @ApiProperty({description: 'Question\'s correct answer', example: 'Hello world', required: false})
    readonly correct_answer?: string;
    @ApiProperty({description: 'Task\'s id', example: 1, required: false})
    readonly task_id?: number;
}