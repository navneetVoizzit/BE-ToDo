import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
