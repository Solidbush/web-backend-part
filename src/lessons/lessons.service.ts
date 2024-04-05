import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Lesson} from "./lesson.model";
import {CreateLessonDto} from "./dto/create-lesson.dto";
import {UpdateLessonDto} from "./dto/update-lesson.dto";
import {Task} from "../tasks/task.model";
import {Chapter} from "../chapters/chapter.model";
import {Course} from "../courses/course.model";
import {Paragraph} from "../paragraphs/paragraph.model";
import {Question} from "../questions/question.model";
import {Problem} from "../problems/problem.model";

@Injectable()
export class LessonsService {
    constructor(@InjectModel(Lesson) private lessonRepository: typeof Lesson,
                @InjectModel(Course) private courseRepository: typeof Course) {}

    async create(dto: CreateLessonDto) {
        const course = await this.courseRepository.findByPk(dto.course_id)
        if (course) {
            return await this.lessonRepository.create(dto)
        }
        throw new NotFoundException('Courses not found')
    }

    async getLesson(lesson_id: number) {
        return await this.lessonRepository.findAll({
            where: {id: lesson_id},
            include: [{model: Task, include: [{model: Question}, {model: Problem}]}, {model: Chapter, include: [{model: Paragraph}]}]
        })
    }

    async delete(lesson_id: number) {
        return await this.lessonRepository.destroy({
            where: {id: lesson_id}
        })
    }

    async update(dto: UpdateLessonDto) {
        const [numberOfAffectedRows, [updatedLessons]] =  await this.lessonRepository.update(dto, {
            where: {id: dto.lesson_id},
            returning: true
        })

        return updatedLessons;
    }

    async allLessons() {
        return await this.lessonRepository.findAll();
    }
}
