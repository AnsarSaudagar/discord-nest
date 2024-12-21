import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  username?: string;
  email?: string;
  password?: string;
  display_name?: string;
  dob?: string;
  is_email_verified?: boolean;
}
