import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {Comment} from "./comment.model";
import {InjectModel} from "@nestjs/sequelize";
import {UpdateCommentDto} from "./dto/update-comment.dto";
import {User} from "../users/user.model";

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comment) private commentRepository: typeof Comment,
                @InjectModel(User) private userRepository: typeof User) {}
    async create(dto: CreateCommentDto) {
        const user = await this.userRepository.findByPk(dto.user_id);
        if (user) {
            return await this.commentRepository.create({...dto})
        }

        throw new NotFoundException(`User with id: ${dto.user_id} not found!`)
    }
    async delete(comment_id: number) {
        return await this.commentRepository.destroy({
            where: {id: comment_id}
        })
    }

    async getAll() {
        return await this.commentRepository.findAll();
    }

    async update(dto: UpdateCommentDto) {
        const [updatedRows, [updatedArray]] = await this.commentRepository.update(dto, {
            where: {id: dto.comment_id},
            returning: true
        })
        return updatedArray;
    }
}
