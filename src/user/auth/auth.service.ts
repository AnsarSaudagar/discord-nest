import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(userData: CreateUserDto) {

      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(userData.password, saltRounds);

      userData.password = hashPassword;

      const newUser = new this.userModel(userData);

      return newUser.save();
  }
}
