import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Course} from "./course.model";
import {FilesService} from "../files/files.service";
import {CreateCourseDto} from "./dto/create-course.dto";
import {DeleteCourseDto} from "./dto/delete-course.dto";
import {UpdateCourseDto} from "./dto/update-course.dto";
import {Lesson} from "../lessons/lesson.model";

@Injectable()
export class CoursesService {

    constructor(@InjectModel(Course) private courseRepository: typeof Course,
                private fileService: FilesService) {
    }
    async create(dto: CreateCourseDto, img: any){
        const fileName = await this.fileService.createFile(img)
        return await this.courseRepository.create({...dto, img: fileName})
    }

    async getAll() {
        return await this.courseRepository.findAll({
            include: {model: Lesson}
        });
    }

    async getCourse(course_id: number) {
        return await this.courseRepository.findAll({
            where: {id: course_id},
            include: {model: Lesson}
        })
    }

    async deleteCourse(dto: DeleteCourseDto) {
        let course = await this.courseRepository.findAll({
            where: {id: dto.course_id}
        })

        if (course.length > 0) {
            await this.fileService.deleteFile(course[0].img)
        }

        return await this.courseRepository.destroy({
            where: {id: dto.course_id}
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
