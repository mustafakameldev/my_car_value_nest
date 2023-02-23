import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.userService.find(email);
    if (users?.length) {
      throw new BadRequestException('Email in use');
    }
    //Hash user password
    // Generate a Salt
    const salt = randomBytes(8).toString('hex');
    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Join the hashed result and the salt

    const result = salt + '.' + hash.toString('hex');
    //create a new user and save it
    const user = await this.userService.create(email, result);
    // return the user
    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('User not Found ');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash == hash.toString('hex')) {
      return user;
    } else {
      throw new BadRequestException('Bad Password');
    }
  }
}
