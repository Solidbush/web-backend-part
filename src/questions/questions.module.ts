import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './question.model';
import { Task } from '../tasks/task.model';
import { QuestionsController } from './questions.controller';

@Module({
  providers: [QuestionsService],
  controllers: [QuestionsController],
  imports: [SequelizeModule.forFeature([Question, Task])],
})
export class QuestionsModule {}
