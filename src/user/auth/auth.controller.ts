import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';
import { AuthCustomGuard } from './auth.guard';
import { LoginDto } from '../dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    try {
      const user: User = await this.authService.register(userData);

      return user;
    } catch (error) {
      console.log(error);

      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          { message: `Email Already Exists`, error: 'Bad Request' },
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
  async login(@Body() credentials: LoginDto) {
    try {
      return await this.authService.login(
        credentials.email,
        credentials.password,
      );
    } catch (error) {
      if (error.message === 'Unauthorized') {
        error.message = 'Please Enter a valid password';
      }

      throw new HttpException(
        { message: error.message, error: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return { message: 'Logged out' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Request() req, @Res() res) {
    // console.log(req.user);

    let user: User = await this.authService.getUserFromEmail(req.user.email);
    if (!user) {
      const userData: any = {
        email: req.user.email,
        username: req.user.name,
        provider: 'google',
        profile_picture: req.user.picture,
      };
      const newUser: any =
        await this.authService.createUserFromGoogle(userData);
      user = newUser;
    }
    const token = this.authService.createToken({ ...user });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      // maxAge: 1000 * 60 * 60, // 1h
      maxAge: 1000 * 30, // 30sec
    });

    return res.redirect(`http://localhost:4200`);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Redirects to Google login
  }
}
