import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { User } from '../../user/models/user.model';

@Table
export class Watchlist extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  userId: number;

  @Column
  name: string;

  @Column
  assetId: string;

  @BelongsTo(() => User)
  user: User;
}
