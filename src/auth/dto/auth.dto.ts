import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ description: "User's email", example: 'user@mail.ru' })
  readonly email: string;
  @ApiProperty({ description: "User's password", example: 'dev123' })
  readonly password: string;
}
