import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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
}
