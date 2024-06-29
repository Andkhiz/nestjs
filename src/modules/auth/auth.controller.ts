import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto';
import { UserLoginDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserResponse } from './response';
// import { JwtAuthGuard } from 'src/guards/jws-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Users')
  @ApiResponse({ status: 201, type: AuthUserResponse })
  @Post('registration')
  registration(@Body() dto: CreateUserDTO): Promise<AuthUserResponse> {
    return this.authService.registrationUser(dto);
  }

  @ApiTags('Users')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @HttpCode(200)
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }

  /*
  @ApiTags('API')
  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return true;
  } */
}
