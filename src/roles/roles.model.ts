import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model, BelongsToMany } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { UserRoles } from './users-roles.model';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ description: 'Идентификатор', example: '1' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ description: 'Роль пользователя', example: 'ADMIN' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ description: 'Описание роли', example: 'Администратор' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
