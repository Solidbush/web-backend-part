import {ApiProperty} from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty({description: 'Chapter title', example: 'user@mail.ru'})
    readonly email: string;
    @ApiProperty({description: 'Lesson\'s id', example: "dev123"})
    readonly password: string;
}