import { Body, Controller, Post, Req } from '@nestjs/common';
import { User } from 'src/validator/user.validator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() body: User) {
    return this.authService.signup(body);
  }
}
