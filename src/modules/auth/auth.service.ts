import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginRequest, UserInfo } from '../users/dto/user.dto';
import { LoginResponse } from './dto/auth.dto';
import { ResponseMessage } from 'src/models/interfaces/response.message.model';
import { ResponseStatus } from 'src/models/interfaces/response.status.model';
import { Resource } from 'src/app.resource';
import { User } from '../users/entities/user.entity';
import { JWT_SECRET_KEY, JWT_TFA_TOKEN_EXPIRES_TIME } from 'src/config/environment';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }

    return null;
  }

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const user = await this.validateUser(loginRequest.email, loginRequest.password);
    if (!user) {
      return new LoginResponse({
        responseMessage: new ResponseMessage({
          status: ResponseStatus.Fail,
          messageCode: Resource.FAIL,
        })
      })
    }

    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: JWT_SECRET_KEY,
      expiresIn: JWT_TFA_TOKEN_EXPIRES_TIME,
    })
    return new LoginResponse({
      responseMessage: new ResponseMessage({
        status: ResponseStatus.Success,
        messageCode: Resource.SUCCESS,
      }),
      accessToken,
    })
  }
}
