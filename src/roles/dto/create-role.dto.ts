import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: 'Роль пользователя', example: 'Admin' })
  readonly value: string;
  @ApiProperty({ description: 'Описание роли', example: 'Администратор' })
  readonly description: string;
}
