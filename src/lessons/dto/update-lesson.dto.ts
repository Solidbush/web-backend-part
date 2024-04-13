import { ApiProperty } from '@nestjs/swagger';

export class UpdateLessonDto {
  @ApiProperty({ description: "Lesson's id", example: 1 })
  readonly lesson_id: number;
  @ApiProperty({
    description: "Lesson's title",
    example: 'Hello world',
    required: false,
  })
  readonly title?: string;
  @ApiProperty({
    description: "Lesson's progress",
    example: false,
    required: false,
  })
  readonly completed?: boolean;
  @ApiProperty({ description: "Course's id", example: 1, required: false })
  readonly course_id?: number;
}
