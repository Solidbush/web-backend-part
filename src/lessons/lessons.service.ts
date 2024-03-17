import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Lesson} from "./lesson.model";
import {CreateLessonDto} from "./dto/create-lesson.dto";
import {DeleteLessonDto} from "./dto/delete-lesson.dto";
import {UpdateLessonDto} from "./dto/update-lesson.dto";
import {Task} from "../tasks/task.model";

@Injectable()
export class LessonsService {
    constructor(@InjectModel(Lesson) private lessonRepository: typeof Lesson) {}

    async create(dto: CreateLessonDto) {
        return await this.lessonRepository.create(dto)
    }

    async getAll(course_id: number) {
        return await this.lessonRepository.findAndCountAll({
            where: {course_id: course_id},
            include: {model: Task}
        })
    }

    async getLesson(lesson_id: number) {
        return await this.lessonRepository.findAll({
            where: {id: lesson_id},
            include: {model: Task}
        })
    }

    async delete(dto: DeleteLessonDto) {
        return await this.lessonRepository.destroy({
            where: {id: dto.lesson_id}
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
