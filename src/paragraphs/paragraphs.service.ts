import {Injectable, NotFoundException} from '@nestjs/common';
import {Paragraph} from "./paragraph.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateParagraphDto} from "./dto/create-paragraph.dto";
import {DeleteParagraphDto} from "./dto/delete-paragraph.dto";
import {UpdateParagraphDto} from "./dto/update-paragraph.dto";
import {Chapter} from "../chapters/chapter.model";

@Injectable()
export class ParagraphsService {
    constructor(@InjectModel(Paragraph) private paragraphRepository: typeof Paragraph, @InjectModel(Chapter) private chapterRepository: typeof Chapter) {}

    async create(dto: CreateParagraphDto) {
        const chapter = await this.chapterRepository.findByPk(dto.chapter_id);
        if (!chapter) {
            throw new NotFoundException(`Chapter with id: ${dto.chapter_id} not found`);
        }
        return await this.paragraphRepository.create({...dto})
    }

    async delete(dto: DeleteParagraphDto) {
        return await this.paragraphRepository.destroy({
            where: {id: dto.paragraph_id}
        })
    }

    async getAll(chapter_id: number) {
        return await this.paragraphRepository.findAll({
            where: {chapter_id: chapter_id}
        })
    }

    async getParagraph(paragraph_id: number) {
        return await this.paragraphRepository.findAll({
            where: {id: paragraph_id}
        })
    }

    async update(dto: UpdateParagraphDto) {
        if (dto.chapter_id) {
            const chapter = await this.chapterRepository.findByPk(dto.chapter_id);
            if (!chapter) {
                throw new NotFoundException(`Chapter with id: ${dto.chapter_id} not found`)
            }
        }
        return await this.paragraphRepository.update(dto, {
            where: {id: dto.paragraph_id},
            returning: true
        })
    }
}
