import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/user/user.entity';
import { CreateUserDto } from './DTOs';
import { generateProfileImageByGender } from 'src/common/function/random-profile';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.usersRepository.create({
      ...createUserDto,
      profileImage: generateProfileImageByGender(createUserDto.gender),
    });

    return this.usersRepository.save(user);
  }

  async findAll(page: number, limit: number): Promise<UserEntity[]> {
    const skip = (page - 1) * limit;
    return this.usersRepository.find({
      skip,
      take: limit,
    });
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async isValidateUser(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: { id: true },
    });
    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    return user;
  }
}
