import { ApiProperty } from '@nestjs/swagger';

export class ChapterCreateDto {
  @ApiProperty({ description: 'Chapter title', example: 'Hello world' })
  readonly title: string;
  @ApiProperty({ description: "Lesson's id", example: 1 })
  readonly lesson_id: number;
}
