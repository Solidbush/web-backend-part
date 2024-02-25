import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './users/users.module';
import * as process from "process";
import {User} from "./users/user.model";
import {HttpModule} from "@nestjs/axios";


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        /*SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User],
            synchronize: true,
            autoLoadModels: true
        })*/
        /*UsersModule*/ HttpModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}

