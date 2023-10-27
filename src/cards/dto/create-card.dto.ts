import { IsNumber, Length, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ description: 'id владельца', example: 123 })
  @IsNumber({}, { message: 'ID владельца должен быть числом' })
  readonly userId: number;

  @ApiProperty({ description: 'Номер карты', example: '123456789101' })
  @IsString({ message: 'Номер карты должен быть строкой' })
  @Length(12, 12, { message: 'Номер карты должен быть из 12 цифр' })
  readonly cardNumber: string;

  @ApiProperty({ description: 'Платёжная система', example: 'visa' })
  @IsString({ message: 'Платёжная система должен быть строкой' })
  readonly paymentSystem: string;

  @ApiProperty({ description: 'Трёхзначный CVV код', example: 123 })
  @IsNumber({}, { message: 'CVV должен быть числом' })
  readonly cvv: number;

  @ApiProperty({ description: 'Четырёхзначный PIN код', example: 1234 })
  @IsNumber({}, { message: 'PIN должен быть числом' })
  readonly pin: number;
}
