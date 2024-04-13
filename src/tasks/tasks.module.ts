import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { Question } from '../questions/question.model';
import { Problem } from '../problems/problem.model';
import { Lesson } from '../lessons/lesson.model';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [SequelizeModule.forFeature([Task, Question, Problem, Lesson])],
})
export class TasksModule {}
