import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/dto/create_user.dto';
import { AuthDTO } from './dto/auth.dto';
import { Request } from 'express';
import { AccessTokenGuard, RefreshTokenGuard } from './guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenPairDTO } from './dto/tokenpair.dto';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Authorization controller')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Creates new user and generates new token pair' })
  @ApiResponse({ status: HttpStatus.OK, type: TokenPairDTO })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User already exists',
  })
  @Post('signup')
  signUp(
    @Req() req: Request,
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<TokenPairDTO | null> {
    return this.authService.signUp(req, createUserDTO);
  }

  @ApiOperation({
    summary: 'Validates user credentials and generates new token pair',
  })
  @ApiResponse({ status: HttpStatus.OK, type: TokenPairDTO })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User does not exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Wrong password',
  })
  @Post('signin')
  signIn(
    @Req() req: Request,
    @Body() authDTO: AuthDTO,
  ): Promise<TokenPairDTO | null> {
    return this.authService.signIn(req, authDTO);
  }

  @ApiOperation({
    summary: 'Validates refresh token and generating new token pair',
  })
  @ApiResponse({ status: HttpStatus.OK, type: TokenPairDTO })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Access denied' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User does not exists',
  })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@Req() req: Request, @Body() uuid: string): Promise<TokenPairDTO | null> {
    const refreshToken = req.user['refreshToken'];

    return this.authService.refreshTokens(uuid, refreshToken);
  }

  @ApiOperation({ summary: 'Deletes refresh session from Redis storage' })
  @ApiResponse({ status: HttpStatus.OK })
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logOut(@Req() req: Request) {
    this.authService.logOut(req.user['sub']);
  }
}
