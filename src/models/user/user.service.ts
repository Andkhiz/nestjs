import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { users } from 'src/moks';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto';
import { AppError } from 'src/common/errors';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly UserRepository: typeof User,
  ) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  getUsers() {
    return users;
  }

  async findUserByEmail(email: string) {
    return this.UserRepository.findOne({ where: { email } });
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);

    dto.password = await this.hashPassword(dto.password);

    await this.UserRepository.create({ ...dto });
    return dto;
  }
}
