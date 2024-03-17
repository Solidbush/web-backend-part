import {ApiProperty} from "@nestjs/swagger";

export class DeleteProblemDto {
    @ApiProperty({description: 'Problem\'s id', example: 1})
    readonly problem_id: number;
}