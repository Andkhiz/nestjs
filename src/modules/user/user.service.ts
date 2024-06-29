import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { users } from 'src/moks';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, ResponseUserDTO, UpdateUserDTO } from './dto';
import { Watchlist } from '../watchlist/models/watchlist.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly UserRepository: typeof User) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  getUsers() {
    return users;
  }

  async findUserByEmail(email: string) {
    return this.UserRepository.findOne({ where: { email } });
  }

  async createUser(dto: CreateUserDTO): Promise<boolean> {
    const dtoHashPassword = { ...dto };
    dtoHashPassword.password = await this.hashPassword(dto.password);
    await this.UserRepository.create({ ...dtoHashPassword });
    return true;
  }

  async publicUser(email: string): Promise<ResponseUserDTO> {
    return this.UserRepository.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
      include: {
        model: Watchlist,
        required: false,
      },
    });
  }

  async getUser(id: number, email: string): Promise<ResponseUserDTO> {
    return this.UserRepository.findOne({
      where: { id, email },
      attributes: { exclude: ['password'] },
      include: {
        model: Watchlist,
        required: false,
      },
    });
  }

  async updateUser(id: number, email: string, dto: UpdateUserDTO): Promise<ResponseUserDTO> {
    await this.UserRepository.update(dto, { where: { email, id } });
    const user = await this.publicUser(email);
    return user; //{ ...dto, email };
  }

  async deleteUser(email: string): Promise<boolean> {
    await this.UserRepository.destroy({ where: { email } });
    return true;
  }
}
