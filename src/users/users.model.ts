import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model, BelongsToMany, HasMany } from 'sequelize-typescript';
import { Card } from 'src/cards/cards.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/users-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ description: 'Идентификатор', example: 1 })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ description: 'Имя пользователя', example: 'Alexander' })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ description: 'Фамилия пользователя', example: 'Kataev' })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @ApiProperty({ description: 'Почта', example: 'user@gmail.com' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ description: 'Пароль', example: 'qweqwe123' })
  @Column({ type: DataType.STRING })
  password: string;

  @ApiProperty({ description: 'Refresh-токен', example: 'qweqwe123' })
  @Column({ type: DataType.STRING })
  refreshToken: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Card)
  cards: Card[];
}
