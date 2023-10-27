import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ description: 'Название роли', example: 'USER' })
  @IsString({ message: 'Роль должна быть строкой' })
  readonly value: string;

  @ApiProperty({ description: 'ID пользователя', example: 123 })
  @IsNumber({}, { message: 'ID пользователья должен быть числом' })
  readonly userId: number;
}
