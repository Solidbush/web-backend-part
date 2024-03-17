import {ApiProperty} from "@nestjs/swagger";

export class CreateProblemDto {
    @ApiProperty({description: 'Problem\'s title', example: 'Hello world'})
    readonly title: string;
    @ApiProperty({description: 'Problem\'s description', example: 'Hello world'})
    readonly description: string;
    @ApiProperty({description: 'Problem\'s tests', example: 'Need realisation'})
    readonly tests: string;
    @ApiProperty({description: 'Task\'s id', example: 1})
    readonly task_id: number;
}