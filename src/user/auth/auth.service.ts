import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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

    userData.password_hash = hashPassword;

    const newUser = this.userRepository.create(userData);

    return this.userRepository.save(newUser);
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {        
      throw new Error('Please Enter a valid mail');
    }
    
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email , username: user.username};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  createToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    return this.jwtService.sign(payload, { expiresIn: '30sec' });
  }

  getUserFromEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  createUserFromGoogle(user: any) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}
