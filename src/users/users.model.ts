import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model, BelongsToMany } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/users-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ description: 'Идентификатор', example: '1' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ description: 'Почта', example: 'user@gmail.com' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ description: 'Пароль', example: 'qweqwe123' })
  @Column({ type: DataType.STRING, unique: true })
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
