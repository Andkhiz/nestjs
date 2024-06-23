import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { users } from 'src/moks';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto';

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
    dto.password = await this.hashPassword(dto.password);

    await this.UserRepository.create({ ...dto });
    return dto;
  }
}
