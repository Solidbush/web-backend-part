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
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Comment } from './comment.model';
import { INTEGER } from 'sequelize';
import { AuthGuard } from '../auth/auth.guard';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}
  @Post()
  @ApiOperation({
    summary: 'Create new comment',
    description: 'This endpoint creates new comment',
  })
  @ApiBody({
    description: 'Create new comment',
    type: CreateCommentDto,
  })
  @ApiCreatedResponse({
    description: 'Comment created!',
    type: Comment,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: NotFoundException,
  })
  @ApiBadRequestResponse({
    description: 'Unreal body for comment',
    type: BadRequestException,
  })
  @ApiUnauthorizedResponse({
    description: 'Problems with authorization token',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async createComment(@Body() dto: CreateCommentDto) {
    return await this.commentService.create(dto);
  }
  @Delete('/:comment_id')
  @ApiOperation({
    summary: 'Delete comment with id',
    description:
      'This endpoint deletes comment and return count of deleted rows',
  })
  @ApiBody({
    description: 'Delete comment',
    type: INTEGER,
  })
  @ApiOkResponse({
    description: 'Count of deleted comments',
    type: Number,
  })
  @ApiNotAcceptableResponse({
    description: 'Unreal id for comment',
  })
  @ApiUnauthorizedResponse({
    description: 'Problems with authorization token',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteComment(
    @Param(
      'comment_id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    comment_id: number,
  ) {
    return await this.commentService.delete(comment_id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all comments',
    description: 'This endpoint return array with Comments or empty array',
  })
  @ApiOkResponse({
    description: 'Comments array',
    type: Comment,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Unreal query params for method',
  })
  async getAllComments(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    page = page ? Number(page) : 1;
    limit = limit ? Number(limit) : 10;
    return await this.commentService.getAll(page, limit);
  }
}
