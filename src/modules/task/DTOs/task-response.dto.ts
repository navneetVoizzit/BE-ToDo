import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { TaskPriority, TaskStatus } from '../enums';
import { UserResponseDto } from 'src/modules/user/DTOs';

export class TaskResponseDto {
  @ApiResponseProperty()
  @Expose()
  id: string;

  @ApiResponseProperty()
  @Expose()
  title: string;

  @ApiResponseProperty()
  @Expose()
  description: string;

  @ApiResponseProperty()
  @Expose()
  deadline: Date;

  @ApiResponseProperty({ enum: TaskStatus })
  @Expose()
  status: TaskStatus;

  @ApiResponseProperty({ enum: TaskPriority })
  @Expose()
  priority: TaskPriority;

  @ApiResponseProperty({ type: () => UserResponseDto })
  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  @ApiResponseProperty()
  @Expose()
  createdAt: Date;

  @ApiResponseProperty()
  @Expose()
  updatedAt: Date;
}
