import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ResponceWatchlistDTO } from 'src/modules/watchlist/dto';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UpdateUserDTO {
  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  username: string;

  /* @ApiProperty()
  @IsString()
  email: string; */
}

export class ResponseUserDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiPropertyOptional({ type: [ResponceWatchlistDTO] }) // WatchlistDto - DTO для элементов массива watchlist
  watchlist: ResponceWatchlistDTO[];
}
