import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ResponseUserDTO } from 'src/modules/user/dto';

export class AuthUserResponse {
  @ApiProperty()
  user: ResponseUserDTO;

  @ApiProperty()
  @IsString()
  token: string;
}
