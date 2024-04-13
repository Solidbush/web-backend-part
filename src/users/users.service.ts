import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Course } from '../courses/course.model';
import { SubscribeOnCourseDto } from './dto/subscribe-on-course.dto';
import { CoursesService } from '../courses/courses.service';
import { UnsubscribeFromCourseDto } from './dto/unsubscribe-from-course.dto';
import { UserCourses } from '../courses/user-courses.model';
import { BanUserDto } from './dto/ban-user.dto';
import { Comment } from '../comments/comment.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private courseService: CoursesService,
    @InjectModel(Comment) private commentRepository: typeof Comment,
    @InjectModel(UserCourses) private courseRepository: typeof UserCourses,
  ) {}
  async createUser(dto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      return await this.userRepository.create({
        email: dto.email,
        password: hashedPassword,
      });
    } catch (e) {
      throw new ConflictException(
        `User with the same email: ${dto.email} already exists`,
      );
    }
  }

  async getAllUsers() {
    return await this.userRepository.findAll({
      include: { model: Course },
    });
  }

  async findUser(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

  async subscribe(dto: SubscribeOnCourseDto) {
    const user = await this.userRepository.findByPk(dto.user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const courses = await this.courseService.getCourse(dto.course_id);
    if (courses.length === 0) {
      throw new NotFoundException('Courses not found');
    }

    const existingAssociation = await UserCourses.findOne({
      where: {
        user_id: dto.user_id,
        course_id: dto.course_id,
      },
    });

    if (existingAssociation) {
      throw new NotFoundException('User already has got this course!');
    } else {
      return await user.$add('courses', dto.course_id);
    }
  }

  async unsubscribe(dto: UnsubscribeFromCourseDto) {
    const user = await this.userRepository.findByPk(dto.user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingAssociation = await UserCourses.findOne({
      where: {
        user_id: dto.user_id,
        course_id: dto.course_id,
      },
    });

    if (existingAssociation) {
      return await user.$remove('courses', dto.course_id);
    } else {
      throw new NotFoundException("User already hasn't got this course!");
    }
  }

  async delete(user_id: number) {
    return await this.userRepository.destroy({
      where: {
        id: user_id,
      },
    });
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.ban_reason) {
      user.banned = true;
      user.banReason = dto.ban_reason;
      return await user.save();
    }

    if (dto.unban_reason) {
      user.banned = false;
      user.banReason = dto.unban_reason;
      return await user.save();
    }

    throw new BadRequestException(
      'Response should contains ban_reason or unban_reason field!',
    );
  }

  async getComments(user_id: number) {
    return await this.commentRepository.findAll({
      where: { user_id: user_id },
    });
  }

  async getCourses(user_id: number) {
    return await this.courseRepository.findAll({
      where: { user_id: user_id },
    });
  }
}
