import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({description: 'Comment\'s text', example: 'Hello world'})
    readonly text: string;
    @ApiProperty({description: 'User\'s id', example: 1})
    readonly user_id: number;
}