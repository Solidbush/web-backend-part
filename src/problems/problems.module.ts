import { Module } from '@nestjs/common';
import { ProblemsController } from './problems.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Problem} from "./problem.model";
import {Task} from "../tasks/task.model";
import {ProblemsService} from "./problems.service";

@Module({
  controllers: [ProblemsController],
  providers: [ProblemsService],
  imports: [
    SequelizeModule.forFeature([Problem, Task])
  ]
})
export class ProblemsModule {}
