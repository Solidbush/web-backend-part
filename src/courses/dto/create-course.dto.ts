import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ description: "Course's name", example: 'First course' })
  readonly name: string;
  @ApiProperty({ description: "Course's description", example: 'First course' })
  readonly description: string;
  @ApiProperty({ description: "Course's img", example: 'img..jpg' })
  readonly img: string;
}
