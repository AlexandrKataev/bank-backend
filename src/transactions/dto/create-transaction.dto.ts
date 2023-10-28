import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ description: 'id карты', example: 1 })
  readonly cardId: number;

  @ApiProperty({ description: 'id контакта', example: 1 })
  readonly contactId: number;

  @ApiProperty({ description: 'Тип транзакции - отправление или получение', example: 'sent' })
  readonly type: 'sent' | 'received';

  @ApiProperty({ description: 'Сумма', example: '100' })
  readonly amount: number;

  @ApiProperty({ description: 'Описание/комментарий', example: 'Оплата за услуги' })
  readonly description: string;
}
