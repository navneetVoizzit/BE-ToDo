// src/modules/user/dto/user-response.dto.ts
import { Expose } from 'class-transformer';
import { ApiResponseProperty } from '@nestjs/swagger';

@Expose()
export class UserResponseDto {
  @ApiResponseProperty()
  @Expose()
  id: string;

  @ApiResponseProperty()
  @Expose()
  firstName: string;

  @ApiResponseProperty()
  @Expose()
  lastName: string;

  @ApiResponseProperty()
  @Expose()
  email: string;

  @ApiResponseProperty()
  @Expose()
  phoneNumber: string;

  @ApiResponseProperty()
  @Expose()
  profileImage: string;

  @ApiResponseProperty()
  @Expose()
  gender: string;
}
