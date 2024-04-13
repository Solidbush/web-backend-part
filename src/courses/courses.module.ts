import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson } from '../lessons/lesson.model';
import { Course } from './course.model';
import { User } from '../users/user.model';
import { UserCourses } from './user-courses.model';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [
    SequelizeModule.forFeature([Lesson, Course, User, UserCourses]),
    FilesModule,
  ],
  exports: [CoursesService],
})
export class CoursesModule {}
