import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Lesson } from '../lessons/lesson.model';
import { User } from '../users/user.model';
import { UserCourses } from './user-courses.model';
import { ApiProperty } from '@nestjs/swagger';

interface CourseCreationAttributes {
  name: string;
  description: string;
  img: string;
}

@Table({ tableName: 'courses' })
export class Course extends Model<Course, CourseCreationAttributes> {
  @ApiProperty({ description: "Course's id", example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: "Course's name", example: 'First course' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    description: "Course's description",
    example: 'Try to make course',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ description: "Course's img", example: 'image.jpg' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    defaultValue: '',
  })
  img: string;

  @ApiProperty({ description: 'Lessons', type: () => Lesson, isArray: true })
  @HasMany(() => Lesson, { onDelete: 'CASCADE' })
  lessons: Lesson[];

  @ApiProperty({ description: 'Users', type: () => User, isArray: true })
  @BelongsToMany(() => User, () => UserCourses)
  users: User[];
}
