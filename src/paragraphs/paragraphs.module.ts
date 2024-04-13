import { Module } from '@nestjs/common';
import { ParagraphsService } from './paragraphs.service';
import { ParagraphsController } from './paragraphs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Paragraph } from './paragraph.model';
import { Chapter } from '../chapters/chapter.model';

@Module({
  providers: [ParagraphsService],
  controllers: [ParagraphsController],
  imports: [SequelizeModule.forFeature([Paragraph, Chapter])],
})
export class ParagraphsModule {}
