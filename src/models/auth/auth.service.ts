import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { AppError } from 'src/common/const/errors';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(private readonly userServise: UserService) {}

  async registrationUser(dto: CreateUserDTO): Promise<AuthUserResponse> {
    const existUser = await this.userServise.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    return this.userServise.createUser(dto);
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

    return existUser;
  }
}
