import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Task} from "./task.model";
import {CreateTaskDto} from "./dto/create-task.dto";
import {DeleteTaskDto} from "./dto/delete-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {Lesson} from "../lessons/lesson.model";

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
            where: {id: task_id}
        });
    }

    async getAll(lesson_id: number) {
        return await this.taskRepository.findAll({
            where: {lesson_id: lesson_id}
        });
    }

    async delete(dto: DeleteTaskDto) {
        return await this.taskRepository.destroy({
            where: {id: dto.task_id}
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
