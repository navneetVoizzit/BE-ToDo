import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../DTOs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const { password } = createUserDto;
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return user;
  }

  async login(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return payload;
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }
}
