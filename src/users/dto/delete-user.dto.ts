import {ApiProperty} from "@nestjs/swagger";

export class DeleteUserDto {
    @ApiProperty({description: 'User id', example: 1})
    readonly user_id: number;
}