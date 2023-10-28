import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, ForeignKey, Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { Card } from 'src/cards/cards.model';
import { Contact } from 'src/contacts/contacts.model';
import { User } from 'src/users/users.model';

interface TransactionCreationAttrs {
  userId: number;
  cardNumber: string;
  paymentSystem: string;
  cvv: number;
  pin: number;
}

@Table({ tableName: 'transaction' })
export class Transaction extends Model<Transaction, TransactionCreationAttrs> {
  @ApiProperty({ description: 'id транзакции', example: 1 })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ description: 'id карты', example: 1 })
  @ForeignKey(() => Card)
  @Column({ type: DataType.INTEGER, allowNull: false })
  cardId: number;

  @BelongsTo(() => Card)
  card: Card;

  @ApiProperty({ description: 'id контакта', example: 1 })
  @ForeignKey(() => Contact)
  @Column({ type: DataType.INTEGER, allowNull: false })
  contactId: number;

  @BelongsTo(() => Contact)
  contact: Contact;

  @ApiProperty({ description: 'Тип транзакции - отправление или получение', example: 'sent' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: 'sent' | 'received';

  @ApiProperty({ description: 'Сумма', example: '100' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  amount: number;

  @ApiProperty({ description: 'Описание/комментарий', example: 'Оплата за услуги' })
  @Column({ type: DataType.STRING, allowNull: true })
  description: string;
}
