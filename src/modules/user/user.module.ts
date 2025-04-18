import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/user/user.entity';
import { ValidateUserConstraint } from './validator';
import { UserService } from './user.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController, AuthController],
  providers: [UserService, ValidateUserConstraint, AuthService],
  exports: [UserService, ValidateUserConstraint],
})
export class UserModule {}
