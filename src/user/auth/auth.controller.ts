import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    try {
      const user: User = await this.authService.register(userData);
      return user;
    } catch (error) {
      if (error.code === 11000) {
        const field = error.keyValue.email ? 'Email' : 'Username';
        throw new HttpException(
          { message: `${field} Already Exists`, error: 'Bad Request' },
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        { message: error.message, error: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(@Body() credentials: any) {
    try {
      return await this.authService.login(
        credentials.email,
        credentials.password,
      );
    } catch (error) {
      console.log(error.message);
      throw new HttpException(
        { message: error.message, error: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
