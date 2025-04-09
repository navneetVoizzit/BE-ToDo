import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/user/user.entity';
import { CreateUserDto, UserResponseDto } from './DTOs';
import { generateProfileImageByGender } from 'src/common/function/random-profile';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name); // Logger

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = this.usersRepository.create({
        ...createUserDto,
        profileImage: generateProfileImageByGender(createUserDto.gender),
      });

      return await this.usersRepository.save(user);
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to create user');
    }
  }

  async findAll(page: number, limit: number): Promise<UserEntity[]> {
    try {
      const skip = (page - 1) * limit;
      const users = await this.usersRepository.find({
        skip,
        take: limit,
      });
      return users;
    } catch (error) {
      this.logger.error(
        `Error finding all users: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to retrieve users');
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      this.logger.error(
        `Error finding user by ID: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to retrieve user');
    }
  }
}
