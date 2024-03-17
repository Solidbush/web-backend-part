import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {ChaptersService} from "./chapters.service";
import {ChapterCreateDto} from "./dto/chapter-crate.dto";
import {ChapterDeleteDto} from "./dto/chapter-delete.dto";
import {ChapterUpdateDto} from "./dto/chapter-update.dto";
import {RemoveParagraphDto} from "./dto/remove-paragraph.dto";
import {
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from "@nestjs/swagger";
import {Chapter} from "./chapter.model";

@Controller('chapters')
@ApiTags('chapters')
export class ChaptersController {
    constructor(private chapterService: ChaptersService) {}

    @Post()
    @ApiOperation({
        summary: 'Create new chapter',
        description: 'This endpoint creates new chapter'
    })
    @ApiBody({
        description: 'Create new chapter',
        type: ChapterCreateDto
    })
    @ApiCreatedResponse({
        description: 'Chapter created!',
        type: Chapter
    })
    async createChapter(@Body() dto: ChapterCreateDto) {
        return await this.chapterService.create(dto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all chapters',
        description: 'This endpoint return array with Chapters or empty array'
    })
    @ApiOkResponse({
        description: 'Chapters array',
        type: Chapter,
        isArray: true
    })
    async allChapters() {
        return await this.chapterService.allChapters();
    }

    @Get('/:chapter_id')
    @ApiOperation({
        summary: 'Get chapter by id',
        description: 'This endpoint return array with Chapters or empty array'
    })
    @ApiOkResponse({
        description: 'Chapter',
        type: Chapter,
        isArray: true
    })
    async getChapter(@Param('chapter_id') chapter_id: number){
        return await this.chapterService.getChapter(chapter_id);
    }


    @Get('/in-lesson/:lesson_id')
    @ApiOperation({
        summary: 'Get all chapters in lesson',
        description: 'This endpoint return array with Chapters in lesson or empty array'
    })
    @ApiOkResponse({
        description: 'Chapters in lesson',
        type: Chapter,
        isArray: true
    })
    async getChapters(@Param('lesson_id') lesson_id: number) {
        return await this.chapterService.getAll(lesson_id);
    }

    @Delete()
    @ApiOperation({
        summary: 'Delete chapter with id',
        description: 'This endpoint deletes chapter and return count of deleted rows'
    })
    @ApiBody({
        description: 'Delete chapter',
        type: ChapterDeleteDto
    })
    @ApiOkResponse({
        description: 'Count of deleted chapters',
        type: Number
    })
    async deleteChapter(@Body() dto: ChapterDeleteDto) {
        return await this.chapterService.delete(dto);
    }

    @Put()
    @ApiOperation({
        summary: 'Update chapter by id',
        description: 'This endpoint will update chapter and return updated chapter'
    })
    @ApiBody({
        description: 'Update some fields in chapter',
        type: ChapterUpdateDto
    })
    @ApiOkResponse({
        description: 'Chapter updated successfully',
        type: Chapter
    })
    @ApiNotFoundResponse({
        description: 'Chapter not found',
        type: NotFoundException
    })
    async updateChapter(@Body() dto: ChapterUpdateDto) {
        return await this.chapterService.update(dto);
    }

    @Post('/remove-paragraph')
    @ApiOperation({
        summary: 'Remove chapter from lesson',
        description: 'This endpoint removes chapter from lesson by id'
    })
    @ApiBody({
        description: 'Remove paragraph from chapter',
        type: RemoveParagraphDto
    })
    @ApiOkResponse({
        description: 'Paragraph removed successfully',
        type: Chapter
    })
    @ApiNotFoundResponse({
        description: 'Chapter not found',
        type: NotFoundException
    })
    async removeParagraph(@Body() dto: RemoveParagraphDto) {
        return await this.chapterService.remove(dto);
    }
}
