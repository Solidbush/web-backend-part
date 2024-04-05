import {ApiProperty} from "@nestjs/swagger";

export class BanUserDto {
    @ApiProperty({description: 'User id', example: 1})
    readonly user_id: number;
    @ApiProperty({description: 'Ban reason', example: 'Used bad words in comments!', required: false})
    readonly ban_reason?: string;
    @ApiProperty({description: 'Unban reason', example: 'He told that stop do this', required: false})
    readonly unban_reason?: string;
}