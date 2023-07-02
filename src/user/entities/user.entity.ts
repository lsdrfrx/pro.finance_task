import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ description: 'User primary key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User UUID' })
  @Column()
  @Generated('uuid')
  uuid: string;

  @ApiProperty({ description: 'User email address' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'User login' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: 'User password hash' })
  @Column()
  password: string;

  @ApiProperty({ description: 'User create date' })
  @CreateDateColumn()
  createdAt: Date;
}
