import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Lesson} from "../lessons/lesson.model";
import {Paragraph} from "../paragraphs/paragraph.model";
import {Chapter} from "./chapter.model";

@Module({
  providers: [ChaptersService],
  controllers: [ChaptersController],
  imports: [
    SequelizeModule.forFeature([Lesson, Chapter, Paragraph])
  ]
})
export class ChaptersModule {}
