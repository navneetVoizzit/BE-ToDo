import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { TaskService } from '../task.service';

@Injectable()
@ValidatorConstraint({ name: 'IsValidTask', async: true })
export class ValidateTaskConstraint implements ValidatorConstraintInterface {
  constructor(private readonly taskService: TaskService) {}

  async validate(value: string): Promise<boolean> {
    try {
      const user = await this.taskService.isValidateTask(value);
      return user ? true : false;
    } catch (error) {
      console.log('something wroug with task validator', error);
      return false;
    }
  }
  defaultMessage(): string {
    return 'Task not found';
  }
}

export function IsValidTask(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidateTaskConstraint,
    });
  };
}
