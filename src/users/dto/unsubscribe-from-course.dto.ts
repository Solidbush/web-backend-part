import { ApiProperty } from '@nestjs/swagger';

export class UnsubscribeFromCourseDto {
  @ApiProperty({ description: 'Course id', example: 1 })
  readonly course_id: number;
  @ApiProperty({ description: 'User id', example: 1 })
  readonly user_id: number;
}
