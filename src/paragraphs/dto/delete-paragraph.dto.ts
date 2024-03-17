import {ApiProperty} from "@nestjs/swagger";

export class DeleteParagraphDto {
    @ApiProperty({description: 'Paragraph\'s id', example: 1})
    readonly paragraph_id: number;
}