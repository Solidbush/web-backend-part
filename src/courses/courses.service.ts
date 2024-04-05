import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Course} from "./course.model";
import {FilesService} from "../files/files.service";
import {CreateCourseDto} from "./dto/create-course.dto";
import {UpdateCourseDto} from "./dto/update-course.dto";
import {Lesson} from "../lessons/lesson.model";
import {Chapter} from "../chapters/chapter.model";
import {Paragraph} from "../paragraphs/paragraph.model";
import {Task} from "../tasks/task.model";
import {Question} from "../questions/question.model";
import {Problem} from "../problems/problem.model";

@Injectable()
export class CoursesService {

    constructor(@InjectModel(Course) private courseRepository: typeof Course,
                private fileService: FilesService) {
    }
    async create(dto: CreateCourseDto, img: any){
        const fileName = await this.fileService.createFile(img)
        return await this.courseRepository.create({...dto, img: fileName})
    }

    async getAll(page: number, limit: number) {
        const offset = (page - 1) * limit;
        if (page <= 0 || limit <= 0) {
            throw new BadRequestException(`Unreal params for method page: ${page}, limit: ${limit}`)
        }
        return await this.courseRepository.findAll({
            limit,
            offset,
            include: {model: Lesson}
        });
    }

    async getCourse(course_id: number) {
        return await this.courseRepository.findAll({
            where: {id: course_id},
            include: {model: Lesson, include: [{model: Chapter, include: [{model: Paragraph}]}, {model: Task, include: [{model: Question}, {model: Problem}]}]}
        })
    }

    async deleteCourse(course_id: number) {
        let course = await this.courseRepository.findAll({
            where: {id: course_id}
        })

        if (course.length > 0) {
            await this.fileService.deleteFile(course[0].img)
        }

        return await this.courseRepository.destroy({
            where: {id: course_id}
        })
    }

    async updateCourse(dto: UpdateCourseDto, image: any) {
        if (image) {
            let course = await this.courseRepository.findAll({
                where: {id: dto.course_id}
            })

            if (course.length > 0) {
                await this.fileService.deleteFile(course[0].img)
            }
            const fileName = await this.fileService.createFile(image)
            const [numberOfAffectedRows, [updatedCourses]] = await this.courseRepository.update({...dto, img: fileName}, {
                where: {id: dto.course_id},
                returning: true
            })
            if (numberOfAffectedRows === 0) {
                throw new NotFoundException('Course not found');
            }

            return updatedCourses
        }
        else {
            const [numberOfAffectedRows, [updatedCourses]] = await this.courseRepository.update(dto, {
                where: {id: dto.course_id},
                returning: true
            })
            if (numberOfAffectedRows === 0) {
                throw new NotFoundException('Course not found');
            }

            return updatedCourses
        }
    }

}
