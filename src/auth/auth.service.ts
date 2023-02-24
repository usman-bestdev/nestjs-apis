import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from 'src/validator/user.validator';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(body: User) {
    // Generate a hash of the password
    const hash = await argon.hash(body.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: body.email,
          password: hash,
          firstName: body.firstName,
          lastName: body.lastName,
          middleName: body.middleName,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          middleName: true,
        },
      });

      return user;
    } catch (error) {
      if (error.code == 'P2002')
        throw new ForbiddenException('Email is not allowed');
      throw error;
    }
  }
}
