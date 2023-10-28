import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model } from 'sequelize-typescript';

interface PaymentSystemCreationAttrs {
  value: string;
}

@Table({ tableName: 'paymenSystem' })
export class PaymentSystem extends Model<PaymentSystem, PaymentSystemCreationAttrs> {
  @ApiProperty({ description: 'Идентификатор', example: '1' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ description: 'Название', example: 'VISA' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;
}
