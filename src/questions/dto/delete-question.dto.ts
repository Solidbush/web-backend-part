import {ApiProperty} from "@nestjs/swagger";

export class DeleteQuestionDto {
    @ApiProperty({description: 'Question\'s id', example: 1})
    readonly question_id: number;
}