import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { WatchlistDTO, ResponceWatchlistDTO } from './dto';
import { AppError } from 'src/common/const/errors';

@Injectable()
export class WatchlistService {
  constructor(@InjectModel(Watchlist) private readonly watchlistRepository: typeof Watchlist) {}

  async getWatchlistAll(userId: number): Promise<ResponceWatchlistDTO[]> {
    const watchlist = await this.watchlistRepository.findAll({ where: { userId } });
    return watchlist;
  }

  async getWatchlist(userId: number, watchlistId: number): Promise<ResponceWatchlistDTO> {
    const watchlist = await this.watchlistRepository.findOne({ where: { id: watchlistId, userId } });
    if (!watchlist) throw new BadRequestException(AppError.WRONG_WATCHLIST_DATA);

    return watchlist;
  }

  async createAsset(userId: number, dto: WatchlistDTO): Promise<ResponceWatchlistDTO> {
    const watchlist = {
      userId,
      name: dto.name,
      assetId: dto.assetId,
    };
    return this.watchlistRepository.create(watchlist);
  }

  async updateAsset(userId: number, watchlistId: number, dto: WatchlistDTO): Promise<ResponceWatchlistDTO> {
    const watchlist = await this.watchlistRepository.findOne({ where: { id: watchlistId, userId } });
    if (!watchlist) throw new BadRequestException(AppError.WRONG_WATCHLIST_DATA);

    return (
      await this.watchlistRepository.update(dto, {
        where: { userId, id: watchlistId },
        returning: true,
      })
    )[1][0];
  }

  async deleteAsset(userId: number, watchlistId: number): Promise<boolean> {
    await this.watchlistRepository.destroy({
      where: { userId, id: watchlistId },
    });
    return true;
  }
}
