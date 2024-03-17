import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {ParagraphsService} from "./paragraphs.service";
import {CreateParagraphDto} from "./dto/create-paragraph.dto";
import {DeleteParagraphDto} from "./dto/delete-paragraph.dto";
import {UpdateParagraphDto} from "./dto/update-paragraph.dto";
import {ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Paragraph} from "./paragraph.model";

@Controller('paragraphs')
@ApiTags('paragraphs')
export class ParagraphsController {
    constructor(private paragraphService: ParagraphsService) {}

    @Post()
    @ApiOperation({
        summary: 'Create new paragraph',
        description: 'This endpoint creates new paragraph'
    })
    @ApiBody({
        description: 'Create new paragraph',
        type: CreateParagraphDto
    })
    @ApiCreatedResponse({
        description: 'Paragraph created!',
        type: Paragraph
    })
    @ApiNotFoundResponse({
        description: 'Chapter not found',
        type: NotFoundException
    })
    async createParagraph(@Body() dto: CreateParagraphDto) {
        return await this.paragraphService.create(dto);
    }

    @Get('/in-chapter/:chapter_id')
    @ApiOperation({
        summary: 'Get all paragraphs in chapter',
        description: 'This endpoint return array with paragraphs in chapter or empty array'
    })
    @ApiOkResponse({
        description: 'Paragraphs in chapter',
        type: Paragraph,
        isArray: true
    })
    async getAllParagraphs(@Param('chapter_id') chapter_id: number) {
        return await this.paragraphService.getAll(chapter_id)
    }

    @Get('/:paragraph_id')
    @ApiOperation({
        summary: 'Get paragraph by id',
        description: 'This endpoint return array with paragraphs or empty array'
    })
    @ApiOkResponse({
        description: 'Paragraph',
        type: Paragraph,
        isArray: true
    })
    async getChapter(@Param('paragraph_id') paragraph_id: number) {
        return await this.paragraphService.getParagraph(paragraph_id);
    }

    @Delete()
    @ApiOperation({
        summary: 'Delete paragraph with id',
        description: 'This endpoint deletes paragraph and return count of deleted rows'
    })
    @ApiBody({
        description: 'Delete paragraph',
        type: DeleteParagraphDto
    })
    @ApiOkResponse({
        description: 'Count of deleted paragraphs',
        type: Number
    })
    async deleteParagraph(@Body() dto: DeleteParagraphDto) {
        return await this.paragraphService.delete(dto);
    }

    @Put()
    @ApiOperation({
        summary: 'Update paragraph by id',
        description: 'This endpoint will update paragraph and return updated paragraph'
    })
    @ApiBody({
        description: 'Update some fields in paragraph',
        type: UpdateParagraphDto
    })
    @ApiOkResponse({
        description: 'Paragraph updated successfully',
        type: Paragraph
    })
    @ApiNotFoundResponse({
        description: 'Chapter not found',
        type: NotFoundException
    })
    async updateParagraph(@Body() dto: UpdateParagraphDto) {
        return await this.paragraphService.update(dto);
    }
}
