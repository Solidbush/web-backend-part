import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { User } from '../users/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { CommentsController } from './comments.controller';
import {SocketService} from "../soket/socket.service";

@Module({
  providers: [CommentsService, SocketService],
  imports: [SequelizeModule.forFeature([User, Comment])],
  controllers: [CommentsController],
})
export class CommentsModule {}
