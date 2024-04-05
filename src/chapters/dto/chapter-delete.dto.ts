import {ApiProperty} from "@nestjs/swagger";

export class ChapterDeleteDto {
    @ApiProperty({description: 'Chapter\'s id', example: 1})
    readonly chapter_id: number;
}