import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from './auth/guards';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Root controller')
@Controller('/')
export class AppController {
  @ApiOperation({ summary: 'Protected route to test authentication' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: '**OK** if authorization header with valid token specified',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      '**Unauthorized** if authorization token does not specified or invalid',
  })
  @UseGuards(AccessTokenGuard)
  @Get()
  async protectedRoute() {
    return;
  }
}
