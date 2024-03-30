import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Task} from "./task.model";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {Lesson} from "../lessons/lesson.model";
import {Problem} from "../problems/problem.model";
import {Question} from "../questions/question.model";

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task) readonly taskRepository: typeof Task,
                @InjectModel(Lesson) readonly lessonRepository: typeof  Lesson) {}

    async create(dto: CreateTaskDto) {
        const lesson = await this.lessonRepository.findByPk(dto.lesson_id)
        if (!lesson) {
            throw new NotFoundException(`Lesson with id: ${dto.lesson_id} not found`)
        }
        return await this.taskRepository.create(dto);
    }

    async getTask(task_id: number) {
        return await this.taskRepository.findAll({
            where: {id: task_id},
            include: [{model: Problem}, {model: Question}]
        });
    }

    async delete(task_id: number) {
        return await this.taskRepository.destroy({
            where: {id: task_id}
        });
    }

    async update(dto: UpdateTaskDto) {
        if (dto.lesson_id) {
            const lesson = await this.lessonRepository.findByPk(dto.lesson_id)
            if (!lesson) {
                throw new NotFoundException(`Lesson with id: ${dto.lesson_id} not found`)
            }
        }
        return await this.taskRepository.update(dto, {
            where: {id: dto.task_id},
            returning: true
        });
    }
}
