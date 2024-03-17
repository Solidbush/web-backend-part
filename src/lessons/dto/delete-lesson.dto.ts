import {ApiProperty} from "@nestjs/swagger";

export class DeleteLessonDto {
    @ApiProperty({description: 'Lesson\'s id', example: 1})
    readonly lesson_id: number;
}