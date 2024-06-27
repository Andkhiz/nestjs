import { Body, Controller, Delete, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jws-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
// import { CreateUserDTO } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: UpdateUserDTO })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateUserDto: UpdateUserDTO, @Req() request): Promise<UpdateUserDTO> {
    const user = request.user.user;
    // console.log(user);
    return this.userService.updateUser(user.email, updateUserDto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: UpdateUserDTO })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request) {
    const user = request.user.user;
    return this.userService.deleteUser(user.email);
  }
}
