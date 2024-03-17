import {ApiProperty} from "@nestjs/swagger";

export class DeleteCourseDto {
    @ApiProperty({description: 'Course\'s id', example: 1})
    readonly course_id: number;
}