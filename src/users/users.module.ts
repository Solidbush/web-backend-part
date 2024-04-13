import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Comment } from '../comments/comment.model';
import { Course } from '../courses/course.model';
import { UserCourses } from '../courses/user-courses.model';
import { CoursesModule } from '../courses/courses.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Comment, Course, UserCourses]),
    CoursesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
