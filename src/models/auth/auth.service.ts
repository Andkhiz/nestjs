import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { AppError } from 'src/common/const/errors';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServise: UserService,
    private readonly tokenServise: TokenService,
  ) {}

  async registrationUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userServise.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    const user = this.userServise.createUser(dto);
    //const token = await this.tokenServise.generateJwtToken(dto.email);
    return user;
  }

  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    const existUser = await this.userServise.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.WRONG_USER_DATA);

    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );

    if (!validatePassword)
      throw new BadRequestException(AppError.WRONG_USER_DATA);
    const token = await this.tokenServise.generateJwtToken(existUser.email);
    const publicUser = await this.userServise.publicUser(existUser.email);
    return { ...publicUser, token };
  }
}
