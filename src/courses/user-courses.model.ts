import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Course} from "./course.model";
import {User} from "../users/user.model";
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: 'user_courses', createdAt: false, updatedAt: false})
export class UserCourses extends Model<UserCourses> {
    @ApiProperty({description: 'Row\'s id', example: 1})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    })
    id: number;

    @ApiProperty({description: 'Course\'s id', example: 1})
    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER
    })
    course_id: number;

    @ApiProperty({description: 'User\'s id', example: 1})
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    user_id: number;
}