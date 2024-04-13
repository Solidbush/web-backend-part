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

interface QuestionCreationAttributes {
  question: string;
  answers: string;
  correct_answer: string;
}

@Table({ tableName: 'questions' })
export class Question extends Model<Question, QuestionCreationAttributes> {
  @ApiProperty({ description: "Question's id", example: 1 })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ description: "Question's info", example: 'Hello world' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  info: string;

  @ApiProperty({ description: "Question's answers", example: 'Hello world' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  answers: string;

  @ApiProperty({
    description: "Question's correct answer",
    example: 'Hello world',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  correct_answer: string;

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
