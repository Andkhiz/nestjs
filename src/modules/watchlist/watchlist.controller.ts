import {
  Controller,
  Req,
  Body,
  Post,
  UseGuards,
  Get,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Param,
  Put,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { ResponceWatchlistDTO, WatchlistDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jws-guard';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppError } from 'src/common/const/errors';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiTags('Watchlist')
  @ApiResponse({ status: 200, type: [ResponceWatchlistDTO] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getWathlistAll(@Req() request): Promise<ResponceWatchlistDTO[]> {
    return this.watchlistService.getWatchlistAll(+request.user.user.id);
  }

  @ApiTags('Watchlist')
  @ApiResponse({ status: 200, type: ResponceWatchlistDTO })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getWathlist(@Param('id', ParseIntPipe) id: number, @Req() request): Promise<ResponceWatchlistDTO> {
    return this.watchlistService.getWatchlist(+request.user.user.id, id);
  }

  @ApiTags('Watchlist')
  @ApiResponse({ status: 201, type: ResponceWatchlistDTO })
  @UseGuards(JwtAuthGuard)
  @Post()
  createAsset(@Body() assetDTO: WatchlistDTO, @Req() request): Promise<ResponceWatchlistDTO> {
    const user = request.user.user;
    return this.watchlistService.createAsset(+user.id, assetDTO);
  }

  @ApiTags('Watchlist')
  @ApiResponse({ status: 200, type: ResponceWatchlistDTO })
  @ApiBadRequestResponse({ description: AppError.WRONG_WATCHLIST_DATA })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':id')
  updateAsset(
    @Body() assetDTO: WatchlistDTO,
    @Param('id', ParseIntPipe) id: number,
    @Req() request,
  ): Promise<ResponceWatchlistDTO> {
    const user = request.user.user;
    return this.watchlistService.updateAsset(+user.id, id, assetDTO);
  }

  @ApiTags('Watchlist')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteAsset(@Param('id', ParseIntPipe) id: number, @Req() request): Promise<boolean> {
    const user = request.user.user;
    return this.watchlistService.deleteAsset(user.id, id);
  }
}
