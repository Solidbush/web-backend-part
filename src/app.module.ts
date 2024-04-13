import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './users/users.module';
import * as process from "process";
import {User} from "./users/user.model";
import {Comment} from "./comments/comment.model";
import {HttpModule} from "@nestjs/axios";
import { CoursesModule } from './courses/courses.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { CommentsModule } from './comments/comments.module';
import { ChaptersModule } from './chapters/chapters.module';
import { ParagraphsModule } from './paragraphs/paragraphs.module';
import { ProblemsModule } from './problems/problems.module';
import { QuestionsModule } from './questions/questions.module';
import { TasksModule } from './tasks/tasks.module';
import { LessonsModule } from './lessons/lessons.module';
import * as path from 'path';
import {Chapter} from "./chapters/chapter.model";
import {Lesson} from "./lessons/lesson.model";
import {Paragraph} from "./paragraphs/paragraph.model";
import {Task} from "./tasks/task.model";
import {Question} from "./questions/question.model";
import {Problem} from "./problems/problem.model";
import {Course} from "./courses/course.model";
import {UserCourses} from "./courses/user-courses.model";
import { AuthModule } from './auth/auth.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Comment, Chapter, Lesson, Paragraph, Task, Question, Problem, Course, UserCourses],
            synchronize: true,
            autoLoadModels: true
        }),
        UsersModule,
        HttpModule,
        CoursesModule,
        CommentsModule,
        ChaptersModule,
        ParagraphsModule,
        ProblemsModule,
        QuestionsModule,
        TasksModule,
        LessonsModule,
        AuthModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

