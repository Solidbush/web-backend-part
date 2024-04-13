import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: "Task's title", example: 'Hello world' })
  readonly title: string;
  @ApiProperty({ description: "Task's id", example: 1 })
  readonly lesson_id: number;
}
