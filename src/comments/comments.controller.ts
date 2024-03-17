import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {DeleteCommentDto} from "./dto/delete-comment.dto";
import {UpdateCommentDto} from "./dto/update-comment.dto";
import {ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Comment} from "./comment.model";

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
    constructor(private commentService: CommentsService) {}
    @Post()
    @ApiOperation({
        summary: 'Create new comment',
        description: 'This endpoint creates new comment'
    })
    @ApiBody({
        description: 'Create new comment',
        type: CreateCommentDto
    })
    @ApiCreatedResponse({
        description: 'Comment created!',
        type: Comment
    })
    async createComment(@Body() dto: CreateCommentDto) {
        return await this.commentService.create(dto)
    }
    @Delete()
    @ApiOperation({
        summary: 'Delete comment with id',
        description: 'This endpoint deletes comment and return count of deleted rows'
    })
    @ApiBody({
        description: 'Delete comment',
        type: DeleteCommentDto
    })
    @ApiOkResponse({
        description: 'Count of deleted comments',
        type: Number
    })
    async deleteComment(@Body() dto: DeleteCommentDto) {
        return await this.commentService.delete(dto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all comments',
        description: 'This endpoint return array with Comments or empty array'
    })
    @ApiOkResponse({
        description: 'Comments array',
        type: Comment,
        isArray: true
    })
    async getAllComments() {
        return await this.commentService.getAll();
    }

    @Get('/:user_id')
    @ApiOperation({
        summary: 'Get comments by user\'s id',
        description: 'This endpoint return array with Comments or empty array'
    })
    @ApiOkResponse({
        description: 'Comments',
        type: Comment,
        isArray: true
    })
    async getUserComments(@Param('user_id') user_id: number) {
        return await this.commentService.getComments(user_id)
    }

    @Put()
    @ApiOperation({
        summary: 'Update comment',
        description: 'This endpoint update comments by id'
    })
    @ApiBody({
        description: 'Update comment',
        type: UpdateCommentDto
    })
    @ApiOkResponse({
        description: 'Array of updated comments',
        type: Comment,
    })
    async updateComment(@Body() dto: UpdateCommentDto) {
        return await this.commentService.update(dto);
    }
}
