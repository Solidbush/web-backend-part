import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({ description: "Comment's id", example: 1 })
  readonly comment_id: number;
  @ApiProperty({ description: "Comment's text", example: 'Hello world' })
  readonly text: string;
}
