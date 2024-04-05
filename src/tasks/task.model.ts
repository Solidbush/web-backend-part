import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Problem} from "../problems/problem.model";
import {Question} from "../questions/question.model";
import {Lesson} from "../lessons/lesson.model";
import {ApiProperty} from "@nestjs/swagger";

interface TaskCreationAttributes {
    title: string;
}

@Table({tableName: 'tasks'})
export class Task extends Model<Task, TaskCreationAttributes> {
    @ApiProperty({description: 'Task\'s id', example: 1})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({description: 'Task\'s title', example: 'Hello world'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title: string


    @ApiProperty({description: 'Lesson\'s id', example: 1})
    @ForeignKey(() => Lesson)
    @Column({
        type: DataType.INTEGER
    })
    lesson_id: number;

    @ApiProperty({description: 'Lesson', type: () => Lesson})
    @BelongsTo(() => Lesson)
    lesson: Lesson;

    @ApiProperty({description: 'Problems', type: Problem, isArray: true})
    @HasMany(() => Problem, { onDelete: 'CASCADE' })
    problems: Problem[];

    @ApiProperty({description: 'Questions', type: Question, isArray: true})
    @HasMany(() => Question, { onDelete: 'CASCADE' })
    questions: Question[]
}