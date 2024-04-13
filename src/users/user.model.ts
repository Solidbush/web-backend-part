import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Comment } from '../comments/comment.model';
import { Course } from '../courses/course.model';
import { UserCourses } from '../courses/user-courses.model';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ description: 'User id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: 'User email', example: 'user@mail.ru' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ description: 'User password', example: 'dev123' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ description: 'User status', example: false })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({
    description: 'Ban reason or unban reason from admins',
    example: '',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @ApiProperty({ description: "User's comments", isArray: true })
  @HasMany(() => Comment)
  comments: Comment[];

  @ApiProperty({ description: "User's courses", isArray: true })
  @BelongsToMany(() => Course, () => UserCourses)
  courses: Course[];
}
