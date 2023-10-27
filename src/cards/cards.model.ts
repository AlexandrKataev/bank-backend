import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, ForeignKey, Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface CardCreationAttrs {
  userId: number;
  cardNumber: string;
  paymentSystem: string;
  cvv: number;
  pin: number;
}

@Table({ tableName: 'cards' })
export class Card extends Model<Card, CardCreationAttrs> {
  @ApiProperty({ description: 'id карты', example: 1 })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ description: 'id владельца', example: 1 })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  owner: User;

  @ApiProperty({ description: 'Номер карты - 12 цифр', example: '123412341234' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  cardNumber: string;

  @ApiProperty({ description: 'Баланс карты', example: 1000 })
  @Column({ type: DataType.INTEGER, defaultValue: 1000 })
  balance: number;

  @ApiProperty({ description: 'Платёжная система', example: 'visa' })
  @Column({ type: DataType.STRING, allowNull: false })
  paymentSystem: string;

  @ApiProperty({ description: 'Трёхзначный CVV код', example: 123 })
  @Column({ type: DataType.INTEGER, allowNull: false })
  cvv: number;

  @ApiProperty({ description: 'Четырёхзначный PIN код', example: 1234 })
  @Column({ type: DataType.INTEGER, allowNull: false })
  pin: number;
}
