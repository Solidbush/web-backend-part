import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Problem} from "./problem.model";
import {CreateProblemDto} from "./dto/create-problem.dto";
import {UpdateProblemDto} from "./dto/update-problem.dto";
import {Task} from "../tasks/task.model";

@Injectable()
export class ProblemsService {
    constructor(@InjectModel(Problem) readonly problemRepository: typeof Problem, @InjectModel(Task) readonly taskRepository: typeof Task) {}

    async create(dto: CreateProblemDto) {
        const task = this.taskRepository.findByPk(dto.task_id)
        if (!task) {
            throw new NotFoundException(`Task with id: ${dto.task_id} not found`)
        }
        return await this.problemRepository.create(dto);
    }

    async findProblem(problem_id: number) {
        return await this.problemRepository.findAll({
            where: {id: problem_id}
        });
    }

    async delete(problem_id: number) {
        return await this.problemRepository.destroy({
            where: {id: problem_id}
        });
    }

    async update(dto: UpdateProblemDto) {
        if (dto.task_id) {
            const task = await this.taskRepository.findByPk(dto.task_id)
            if (!task) {
                throw new NotFoundException(`Task with id: ${dto.task_id} not found`)
            }
        }
        const [updatedRows, [updatedProblems]] = await this.problemRepository.update(dto, {
            where: { id: dto.problem_id },
            returning: true
        });

        if (updatedRows === 0) {
            throw new NotFoundException('Problem not found!');
        }

        return updatedProblems;
    }
}
