import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredientialsDto } from './dto/auth-credientials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authcredentialsDto: AuthCredientialsDto
  ): Promise<void> {
    return this.authService.signUp(authcredentialsDto);
  }
  @Post('/signin')
  singIn(
    @Body(ValidationPipe) authcredentialsDto: AuthCredientialsDto
  ): Promise<{ accessToken: string }> {
    return this.authService.singIn(authcredentialsDto);
  }
}
