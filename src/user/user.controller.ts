import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User controller')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Returns a user with specified username' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User does not exist',
  })
  @Get('/:username')
  async getUser(@Param('username') username: string): Promise<User> {
    return this.userService.getUserByUsername(username);
  }

  @ApiOperation({ summary: 'Returns all registrated users' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [User],
  })
  @Get('/')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
