import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.checkUser(email, pass);
      const payload = { sub: user.id, username: user.userName };
      // TODO: Generate a JWT and return it here
      // instead of the user object
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }
  }
}
