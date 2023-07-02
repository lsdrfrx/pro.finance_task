import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ description: 'User email address' })
  email: string;

  @ApiProperty({ description: 'User login' })
  username: string;

  @ApiProperty({ description: 'User password' })
  password: string;
}
