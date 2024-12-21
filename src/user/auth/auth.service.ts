import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Registers a new user by hashing their password and saving the user data to the database.
   *
   * @param {CreateUserDto} userData - The data of the user to be registered, including username, email, password, etc.
   * @returns {Promise<User>} A promise that resolves to the created user object once saved in the database.
   *
   * @throws {Error} Throws an error if there is a problem saving the user to the database (e.g., duplicate key).
   */
  async register(userData: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(userData.password, saltRounds);

    userData.password = hashPassword;

    const newUser = new this.userModel(userData);

    return newUser.save();
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user: any = await this.userModel
      .findOne()
      .where({
        email: email,
      })
      .exec();

    if (!user) {        
      throw new Error('Please Enter a valid mail');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, email: user.email , username: user.username};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
