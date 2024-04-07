import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put, UseGuards
} from '@nestjs/common';
import {ParagraphsService} from "./paragraphs.service";
import {CreateParagraphDto} from "./dto/create-paragraph.dto";
import {UpdateParagraphDto} from "./dto/update-paragraph.dto";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNotAcceptableResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags, ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {Paragraph} from "./paragraph.model";
import {INTEGER} from "sequelize";
import {AuthGuard} from "../auth/auth.guard";

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
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @UseGuards(AuthGuard)
    async createParagraph(@Body() dto: CreateParagraphDto) {
        return await this.paragraphService.create(dto);
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
    @ApiNotAcceptableResponse({
        description: "Unreal id for paragraph"
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @UseGuards(AuthGuard)
    async getParagraph(@Param('paragraph_id',
        new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) paragraph_id: number) {
        return await this.paragraphService.getParagraph(paragraph_id);
    }

    @Delete('/:paragraph_id')
    @ApiOperation({
        summary: 'Delete paragraph with id',
        description: 'This endpoint deletes paragraph and return count of deleted rows'
    })
    @ApiBody({
        description: 'Delete paragraph bu id',
        type: INTEGER
    })
    @ApiOkResponse({
        description: 'Count of deleted paragraphs',
        type: Number
    })
    @ApiNotAcceptableResponse({
        description: "Unreal id for paragraph"
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @UseGuards(AuthGuard)
    async deleteParagraph(@Param('paragraph_id',
        new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) paragraph_id: number) {
        return await this.paragraphService.delete(paragraph_id);
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
    @ApiBadRequestResponse({
        description: 'Unreal JSON for update',
        type: BadRequestException
    })
    @ApiUnauthorizedResponse({
        description: 'Problems with authorization token'
    })
    @UseGuards(AuthGuard)
    async updateParagraph(@Body() dto: UpdateParagraphDto) {
        return await this.paragraphService.update(dto);
    }
}
