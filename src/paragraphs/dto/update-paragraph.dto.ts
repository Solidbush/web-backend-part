import { ApiProperty } from '@nestjs/swagger';

export class UpdateParagraphDto {
  @ApiProperty({ description: "Paragraph's id", example: 1 })
  readonly paragraph_id: number;
  @ApiProperty({
    description: 'Paragraph title',
    example: 'Hello world',
    required: false,
  })
  readonly title?: string;
  @ApiProperty({
    description: 'Paragraph text',
    example: 'Hello world',
    required: false,
  })
  readonly text?: string;
  @ApiProperty({ description: "Chapter's id", example: 1 })
  readonly chapter_id?: number;
}
