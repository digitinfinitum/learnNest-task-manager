import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredientialsDto } from './dto/auth-credientials.dto';
import {
  ConflictException,
  InternalServerErrorException
} from '@nestjs/common';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredtialsDto: AuthCredientialsDto): Promise<void> {
    const { username, password } = authCredtialsDto;
    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hasPassword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async validateUserPassword(
    authCredentialsDto: AuthCredientialsDto
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
  private async hasPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
