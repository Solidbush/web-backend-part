import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({ description: "Question's info", example: 'Hello world' })
  readonly info: string;
  @ApiProperty({ description: "Question's answers", example: 'Hello world' })
  readonly answers: string;
  @ApiProperty({
    description: "Question's correct answer",
    example: 'Hello world',
  })
  readonly correct_answer: string;
  @ApiProperty({ description: "Task's id", example: 1 })
  readonly task_id: number;
}
