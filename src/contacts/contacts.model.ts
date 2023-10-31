import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';

interface ContactCreationAttrs {
  userId: number;
  cardNumber: string;
  paymentSystem: string;
  cvv: number;
  pin: number;
}

@Table({ tableName: 'contacts' })
export class Contact extends Model<Contact, ContactCreationAttrs> {
  @ApiProperty({ description: 'id контакта', example: 1 })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ description: 'id владельца', example: 123 })
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({ description: 'Имя контакта', example: 'Mark' })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ description: 'Фамилия контакта', example: 'Poop' })
  @Column({ type: DataType.STRING, allowNull: true })
  lastName: string;

  @ApiProperty({ description: 'Номер телефона', example: 'visa' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  phone: number;
}
