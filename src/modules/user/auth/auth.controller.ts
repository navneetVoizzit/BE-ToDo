import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../DTOs';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { errorHandler, successHandler } from 'src/common/function';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({ status: 201, description: 'User signed up successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async signUp(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.authService.signUp(createUserDto);
      return successHandler(user, 'User signed up successfully');
    } catch (e) {
      errorHandler(e);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() signInDto: Record<string, any>): Promise<any> {
    try {
      const { email, password } = signInDto;
      const res = await this.authService.login(email, password);
      return successHandler(res, 'User logged in successfully');
    } catch (e) {
      errorHandler(e);
    }
  }
}
