import {ApiProperty} from "@nestjs/swagger";

export class CreateLessonDto {
    @ApiProperty({description: 'Lesson\'s title', example: 'Hello world'})
    readonly title: string;
    @ApiProperty({description: 'Progress', example: false})
    readonly completed: boolean;
    @ApiProperty({description: 'Lesson\'s id', example: 1})
    readonly course_id: number;
}