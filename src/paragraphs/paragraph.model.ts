import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Chapter } from '../chapters/chapter.model';
import { ApiProperty } from '@nestjs/swagger';

interface ParagraphCreationsAttributes {
  title: string;
  text: string;
}

@Table({ tableName: 'paragraphs' })
export class Paragraph extends Model<Paragraph, ParagraphCreationsAttributes> {
  @ApiProperty({ description: "Paragraph's id", example: 1 })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ApiProperty({ description: "Paragraph's title", example: 'Hello world' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ description: "Paragraph's text", example: 'Hello world' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @ApiProperty({ description: "Chapter's id", example: 1 })
  @ForeignKey(() => Chapter)
  @Column({
    type: DataType.INTEGER,
  })
  chapter_id: number;

  @ApiProperty({ description: 'Chapter', type: () => Chapter })
  @BelongsTo(() => Chapter)
  chapter: Chapter;
}
