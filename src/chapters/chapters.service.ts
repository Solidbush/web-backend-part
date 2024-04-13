import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chapter } from './chapter.model';
import { ChapterCreateDto } from './dto/chapter-crate.dto';
import { ChapterDeleteDto } from './dto/chapter-delete.dto';
import { ChapterUpdateDto } from './dto/chapter-update.dto';
import { Paragraph } from '../paragraphs/paragraph.model';
import { RemoveParagraphDto } from './dto/remove-paragraph.dto';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectModel(Chapter) private chapterRepository: typeof Chapter,
    @InjectModel(Paragraph) private paragraphRepository: typeof Paragraph,
  ) {}

  async create(dto: ChapterCreateDto) {
    return await this.chapterRepository.create({ ...dto });
  }

  async getAll(lesson_id: number) {
    return await this.chapterRepository.findAll({
      where: { lesson_id: lesson_id },
      include: { model: Paragraph },
    });
  }

  async getChapter(chapter_id: number) {
    return await this.chapterRepository.findAll({
      where: { id: chapter_id },
      include: { model: Paragraph },
    });
  }

  async delete(dto: ChapterDeleteDto) {
    return await this.chapterRepository.destroy({
      where: { id: dto.chapter_id },
    });
  }

  async update(dto: ChapterUpdateDto) {
    const [numberOfAffectedRows, [updateChapters]] =
      await this.chapterRepository.update(dto, {
        where: { id: dto.chapter_id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('Chapter not found');
    }

    return updateChapters;
  }

  async allChapters() {
    return await this.chapterRepository.findAndCountAll();
  }

  async remove(dto: RemoveParagraphDto) {
    const chapter = await this.chapterRepository.findByPk(dto.chapter_id, {
      include: Paragraph,
    });
    if (!chapter) {
      throw new NotFoundException('Chapter not found!');
    }

    const paragraph = await this.paragraphRepository.findByPk(dto.paragraph_id);
    if (!paragraph) {
      throw new NotFoundException('Paragraph not found!');
    }
    await chapter.$remove('paragraphs', paragraph);

    return chapter;
  }
}
