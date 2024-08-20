import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRET_KEY } from 'src/config/environment';

@Module({
  imports: [forwardRef(() => UsersModule), PassportModule, JwtModule.register({
    secret: JWT_SECRET_KEY,
    signOptions: { expiresIn: '7d' }
  })],
  controllers: [],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
