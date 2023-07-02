import { ApiProperty } from '@nestjs/swagger';

export class SessionDTO {
  @ApiProperty({ name: 'User refresh token' })
  refreshToken: string;

  @ApiProperty({ name: 'Browser fingerprint (random generated uuid)' })
  fingerprint: string;

  @ApiProperty({ name: 'Client user-agent' })
  userAgent: string;
}
