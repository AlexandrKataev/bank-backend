import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @ApiProperty()
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ description: 'id роли', example: '1' })
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @ApiProperty({ description: 'id пользователя', example: '1' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
