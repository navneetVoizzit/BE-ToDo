// src/modules/user/dto/user-response.dto.ts
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
import { Gender } from '../enums/gender.enum';

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
