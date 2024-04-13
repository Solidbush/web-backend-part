import { ApiProperty } from '@nestjs/swagger';

export class DeleteCommentDto {
  @ApiProperty({ description: "Comment's id", example: 1 })
  readonly id: number;
  @ApiProperty({ description: "User's id", example: 1 })
  readonly user_id: number;
}
