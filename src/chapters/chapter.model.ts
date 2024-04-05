import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Paragraph} from "../paragraphs/paragraph.model";
import {Lesson} from "../lessons/lesson.model";
import {ApiProperty} from "@nestjs/swagger";

interface ChapterCreationAttributes {
    title: string;
}

@Table({tableName: 'chapters'})
export class Chapter extends Model<Chapter, ChapterCreationAttributes> {
    @ApiProperty({description: 'Chapter\'s id', example: 1})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    })
    id: number;

    @ApiProperty({description: 'Lesson\'s title', example: 'Hello world'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title: string;

    @ApiProperty({description: 'Lesson\'s id', example: 1})
    @ForeignKey(() => Lesson)
    @Column({
        type: DataType.INTEGER
    })
    lesson_id: number;

    @ApiProperty({type: () => Chapter})
    @BelongsTo(() => Lesson)
    lesson: Lesson;

    @ApiProperty({description: 'Paragraphs array', isArray: true})
    @HasMany(() => Paragraph, { onDelete: 'CASCADE' })
    paragraphs: Paragraph[];
}
