import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ name: 'IsValidUser', async: true })
export class ValidateUserConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(value: string): Promise<boolean> {
    try {
      console.log('user', value);
      const user = await this.userService.isValidateUser(value);
      return user ? true : false;
    } catch (error) {
      console.log('something wroug with user validator', error);
      return false;
    }
  }
  defaultMessage(): string {
    return 'User not found';
  }
}

export function IsValidUser(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidateUserConstraint,
    });
  };
}
