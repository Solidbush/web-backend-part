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
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
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
import { Problem } from './problem.model';
import { INTEGER } from 'sequelize';
import { AuthGuard } from '../auth/auth.guard';

@Controller('problems')
@ApiTags('problems')
export class ProblemsController {
  constructor(private problemService: ProblemsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new problem',
    description: 'This endpoint creates new problem',
  })
  @ApiBody({
    description: 'Create new problem',
    type: CreateProblemDto,
  })
  @ApiCreatedResponse({
    description: 'Problem created!',
    type: Problem,
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
    type: NotFoundException,
  })
  @ApiBadRequestResponse({
    description: 'Unreal request body for create problem!',
    type: BadRequestException,
  })
  @ApiUnauthorizedResponse({
    description: 'Problems with authorization token',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async createProblem(@Body() dto: CreateProblemDto) {
    return await this.problemService.create(dto);
  }

  @Get('/:problem_id')
  @ApiOperation({
    summary: 'Get problem by id',
    description: 'This endpoint return array with problems or empty array',
  })
  @ApiOkResponse({
    description: 'Problem',
    type: Problem,
    isArray: true,
  })
  @ApiNotAcceptableResponse({
    description: 'Unreal id for problem',
  })
  @ApiUnauthorizedResponse({
    description: 'Problems with authorization token',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getProblem(
    @Param(
      'problem_id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    problem_id: number,
  ) {
    return await this.problemService.findProblem(problem_id);
  }

  @Delete('/:problem_id')
  @ApiOperation({
    summary: 'Delete problem with id',
    description:
      'This endpoint deletes problem and return count of deleted rows',
  })
  @ApiBody({
    description: 'Delete problem',
    type: INTEGER,
  })
  @ApiOkResponse({
    description: 'Count of deleted problems',
    type: Number,
  })
  @ApiNotAcceptableResponse({
    description: 'Unreal id for problem',
  })
  @ApiUnauthorizedResponse({
    description: 'Problems with authorization token',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteProblem(
    @Param(
      'problem_id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    problem_id: number,
  ) {
    return await this.problemService.delete(problem_id);
  }

  @Put()
  @ApiOperation({
    summary: 'Update problem by id',
    description: 'This endpoint will update problem and return updated problem',
  })
  @ApiBody({
    description: 'Update some fields in problem',
    type: UpdateProblemDto,
  })
  @ApiOkResponse({
    description: 'Problem updated successfully',
    type: Problem,
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
    type: NotFoundException,
  })
  @ApiBadRequestResponse({
    description: 'Unreal request body for update problem!',
    type: BadRequestException,
  })
  @ApiUnauthorizedResponse({
    description: 'Problems with authorization token',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async updateProblem(@Body() dto: UpdateProblemDto) {
    return await this.problemService.update(dto);
  }
}
