import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseDto {
  @ApiProperty({ description: "Course's id", example: 1 })
  readonly course_id: number;
  @ApiProperty({
    description: "Course's description",
    example: 'Hello world',
    required: false,
  })
  readonly description?: string;
  @ApiProperty({
    description: "Course's name",
    example: 'Hello world',
    required: false,
  })
  readonly name?: string;
}
