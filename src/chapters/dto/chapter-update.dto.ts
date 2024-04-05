import {ApiProperty} from "@nestjs/swagger";

export class ChapterUpdateDto {
    @ApiProperty({description: 'Chapter\'s id', example: 1})
    readonly chapter_id: string;
    @ApiProperty({description: 'Lesson\'s title', example: 'Hello world', required: false})
    readonly title?: string;
    @ApiProperty({description: 'Lesson\'s id', example: 1, required: false})
    readonly lesson_id?: number;
}