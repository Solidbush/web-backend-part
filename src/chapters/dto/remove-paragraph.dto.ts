import { ApiProperty } from '@nestjs/swagger';

export class RemoveParagraphDto {
  @ApiProperty({ description: "Chapter's id", example: 1 })
  readonly chapter_id: number;
  @ApiProperty({ description: "Paragraph's id", example: 1 })
  readonly paragraph_id: number;
}
