import {ApiProperty} from "@nestjs/swagger";

export class UpdateProblemDto {
    @ApiProperty({description: 'Problem\'s id', example: 1})
    readonly problem_id: number;
    @ApiProperty({description: 'Problem\'s title', example: 'Hello world', required: false})
    readonly title?: string;
    @ApiProperty({description: 'Problem\'s description', example: 'Hello world', required: false})
    readonly description?: string;
    @ApiProperty({description: 'Problem\'s tests', example: 'Need realisation', required: false})
    readonly tests?: string;
    @ApiProperty({description: 'Task\'s id', example: 1, required: false})
    readonly task_id?: number;
}