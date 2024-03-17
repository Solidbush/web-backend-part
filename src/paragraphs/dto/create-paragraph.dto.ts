import {ApiProperty} from "@nestjs/swagger";

export class CreateParagraphDto {
    @ApiProperty({description: 'Paragraph title', example: 'Hello world'})
    readonly title: string;
    @ApiProperty({description: 'Paragraph text', example: 'Hello world'})
    readonly text: string;
    @ApiProperty({description: 'Chapter\'s id', example: 1})
    readonly chapter_id: number;
}