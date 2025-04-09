import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/user/user.entity';
import { ValidateUserConstraint } from './validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, ValidateUserConstraint],
  exports: [UserService, ValidateUserConstraint],
})
export class UserModule {}
