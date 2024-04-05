import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Lesson} from "./lesson.model";
import {Task} from "../tasks/task.model";
import {Chapter} from "../chapters/chapter.model";
import {Course} from "../courses/course.model";
import {LessonsController} from "./lessons.controller";

@Module({
  providers: [LessonsService],
  controllers: [LessonsController],
  imports: [
    SequelizeModule.forFeature([Lesson, Task, Course, Chapter])
  ]
})
export class LessonsModule {}
