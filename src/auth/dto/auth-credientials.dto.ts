import { MinLength, MaxLength, IsNotEmpty } from 'class-validator';
export class AuthCredientialsDto {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  username: string;
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
