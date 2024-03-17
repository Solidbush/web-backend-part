import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/user.model";
import {ApiProperty} from "@nestjs/swagger";

interface CommentCreationAttributes {
   text: string;
   user_id: number;
}

@Table({tableName: 'comments'})
export class Comment extends Model<Comment, CommentCreationAttributes> {
    @ApiProperty({description: 'Comment\'s id', example: 1})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    })
    id: number

    @ApiProperty({description: 'Comment\'s text', example: 'Hello world'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    text: string;

    @ApiProperty({description: 'Comment\'s likes', example: 10})
    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    likes: number;

    @ApiProperty({description: 'Comment\'s dislikes', example: 10})
    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    dislikes: number;

    @ApiProperty({description: 'User\'s id', example: 1})
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    user_id: number

    @ApiProperty({description: 'Comment\'s author', type: () => User})
    @BelongsTo(() => User)
    author: User;
}