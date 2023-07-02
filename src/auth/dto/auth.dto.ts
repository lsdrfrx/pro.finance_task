import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiProperty({ description: 'User login' })
  username: string;

  @ApiProperty({ description: 'User password' })
  password: string;
}
