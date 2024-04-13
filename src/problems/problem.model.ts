import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Task } from '../tasks/task.model';
import { ApiProperty } from '@nestjs/swagger';

interface ProblemCreationAttributes {
  tittle: string;
  description: string;
  tests: string;
}

@Table({ tableName: 'problems' })
export class Problem extends Model<Problem, ProblemCreationAttributes> {
  @ApiProperty({ description: "Problem's id", example: 1 })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ description: "Problem's title", example: 'Hello world' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ description: "Problem's description", example: 'Hello world' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ description: "Problem's tests", example: 'Need realisation' })
  @Column({
    type: DataType.STRING,
  })
  tests: string;

  @ApiProperty({ description: "Task's id", example: 1 })
  @ForeignKey(() => Task)
  @Column({
    type: DataType.INTEGER,
  })
  task_id: number;

  @ApiProperty({ description: 'Task', type: () => Task })
  @BelongsTo(() => Task)
  task: Task;
}
