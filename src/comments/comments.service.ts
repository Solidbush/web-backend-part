import { Injectable } from '@nestjs/common';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {Comment} from "./comment.model";
import {DeleteCommentDto} from "./dto/delete-comment.dto";
import {InjectModel} from "@nestjs/sequelize";
import {UpdateCommentDto} from "./dto/update-comment.dto";

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comment) private commentRepository: typeof Comment) {}
    async create(dto: CreateCommentDto) {
        return await this.commentRepository.create({...dto})
    }
    async delete(dto: DeleteCommentDto) {
        return await this.commentRepository.destroy({
            where: {id: dto.id, user_id: dto.user_id}
        })
    }

    async getAll() {
        return await this.commentRepository.findAll();
    }

    async getComments(user_id: number) {
        return await this.commentRepository.findAll({
            where: {user_id: user_id}
        })
    }

    async update(dto: UpdateCommentDto) {
        const [updatedRows, [updatedArray]] = await this.commentRepository.update(dto, {
            where: {id: dto.comment_id},
            returning: true
        })
        return updatedArray;
    }
}
