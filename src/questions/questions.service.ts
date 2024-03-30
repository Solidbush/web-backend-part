import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Question} from "./question.model";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {UpdateQuestionDto} from "./dto/update-question.dto";
import {Task} from "../tasks/task.model";

@Injectable()
export class QuestionsService {
    constructor(@InjectModel(Question) readonly questionRepository: typeof Question, @InjectModel(Task) readonly taskRepository: typeof Task) {}

    async create(dto: CreateQuestionDto) {
        const task = await this.taskRepository.findByPk(dto.task_id);
        if (!task) {
            throw new NotFoundException(`Task with id: ${dto.task_id} not found`)
        }
        return await this.questionRepository.create(dto);
    }

    async findQuestion(question_id: number) {
        return await this.questionRepository.findAll({
            where: {id: question_id}
        });
    }

    async delete(question_id: number) {
        return await this.questionRepository.destroy({
            where: {id: question_id}
        });
    }

    async update(dto: UpdateQuestionDto) {
        if (dto.task_id) {
            const task = await this.taskRepository.findByPk(dto.task_id);
            if (!task) {
                throw new NotFoundException(`Task with id: ${dto.task_id} not found`)
            }
        }
        const [updatedRows, [updatedQuestions]] = await this.questionRepository.update(dto, {
            where: {id: dto.question_id},
            returning: true
        });

        if (updatedRows === 0) {
            throw new NotFoundException('Question not found!');
        }

        return updatedQuestions;
    }
}
