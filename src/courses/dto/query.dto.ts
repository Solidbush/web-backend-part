import {ApiProperty} from "@nestjs/swagger";

export class QueryDto {
    @ApiProperty({description: 'page', example: 1})
    readonly page?: number;
    @ApiProperty({description: 'limit', example: 10})
    readonly limit?: number;
}