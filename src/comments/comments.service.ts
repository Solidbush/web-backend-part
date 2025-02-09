import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.model';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '../users/user.model';
import {SocketService} from "../soket/socket.service";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    @InjectModel(User) private userRepository: typeof User,
    private readonly socketService: SocketService
  ) {}
  async create(dto: CreateCommentDto) {
    const user = await this.userRepository.findByPk(dto.user_id);
    if (user) {
      this.socketService.sendToRoom('commentRoom', 'newComment', dto.text);
      return await this.commentRepository.create({ ...dto });
    }

    throw new NotFoundException(`User with id: ${dto.user_id} not found!`);
  }
  async delete(comment_id: number) {
    return await this.commentRepository.destroy({
      where: { id: comment_id },
    });
  }

  async getAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    if (page <= 0 || limit <= 0) {
      throw new BadRequestException(
        `Unreal params for method page: ${page}, limit: ${limit}`,
      );
    }
    return await this.commentRepository.findAndCountAll({
      limit,
      offset,
    });
  }

  async update(dto: UpdateCommentDto) {
    const [updatedRows, [updatedArray]] = await this.commentRepository.update(
      dto,
      {
        where: { id: dto.comment_id },
        returning: true,
      },
    );
    return updatedArray;
  }
}
