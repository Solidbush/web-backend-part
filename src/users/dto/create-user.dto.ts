import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User email', example: 'user@mail.ru' })
  readonly email: string;
  @ApiProperty({ description: 'User password', example: 'dev123' })
  readonly password: string;
}
