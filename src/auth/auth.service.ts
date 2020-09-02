import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredientialsDto } from './dto/auth-credientials.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredientialsDto): Promise<void> {
    return await this.userRepository.signUp(authCredentialsDto);
  }
  async singIn(
    authCredentialDto: AuthCredientialsDto
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialDto
    );
    if (!username) {
      throw new UnauthorizedException('invalid credentials');
    }
    const payload: JWTPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
