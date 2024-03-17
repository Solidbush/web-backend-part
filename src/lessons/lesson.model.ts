import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Task} from "../tasks/task.model";
import {Course} from "../courses/course.model";
import {Chapter} from "../chapters/chapter.model";
import {ApiProperty} from "@nestjs/swagger";

interface LessonCreationAttributes {
    title: string;
    completed?: boolean;
    course_id: number;
}

@Table({tableName: 'lessons'})
export class Lesson extends Model<Lesson, LessonCreationAttributes>{
    @ApiProperty({description: 'Lesson\'s id', example: 1})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true})
    id: number;

    @ApiProperty({description: 'Lesson\'s title', example: 'Hello world'})
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false})
    title: string;

    @ApiProperty({description: 'Lesson\'s progress', example: false})
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false})
    completed : boolean;

    @ApiProperty({description: 'Course\'s id', example: 1})
    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER
    })
    course_id: number

    @ApiProperty({description: 'Course', type: () => Course})
    @BelongsTo(() => Course)
    course: Course;

    @ApiProperty({description: 'Lesson\'s tasks', isArray: true})
    @HasMany(() => Task, { onDelete: 'CASCADE' })
    tasks: Task[]

    @ApiProperty({description: 'Lesson\'s chapters', isArray: true})
    @HasMany(() => Chapter, { onDelete: 'CASCADE' })
    chapters: Chapter[]
}