import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create_user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserByUUID(uuid: string): Promise<User | null> {
    return this.userRepository.findOneBy({ uuid });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = new User();

    user.email = createUserDTO.email;
    user.username = createUserDTO.username;
    user.password = createUserDTO.password;
    user.createdAt = new Date();

    return this.userRepository.save(user);
  }
}
