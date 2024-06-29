import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Put,
  Get,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseUserDTO, UpdateUserDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jws-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
// import { CreateUserDTO } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('Users')
  @ApiResponse({ status: 200, type: ResponseUserDTO })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number, @Req() request) {
    return this.userService.getUser(id, request.user.user.email);
  }

  @ApiTags('Users')
  @ApiResponse({ status: 200, type: ResponseUserDTO })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true })) // удаляет ненужные свойства, id например
  @Put('/:id')
  updateUser(
    @Body() updateUserDto: UpdateUserDTO,
    @Param('id', ParseIntPipe) id: number,
    @Req() request,
  ): Promise<Omit<ResponseUserDTO, 'token'>> {
    const user = request.user.user;
    // console.log(user);
    return this.userService.updateUser(id, user.email, updateUserDto);
  }

  @ApiTags('Users')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request): Promise<boolean> {
    const user = request.user.user;
    return this.userService.deleteUser(user.email);
  }
}
