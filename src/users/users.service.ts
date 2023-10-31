import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { CardsService } from 'src/cards/cards.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    private cardService: CardsService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getUsersList() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.update(updateUserDto, { where: { id } });
    return user;
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.findByPk(id);
      await this.cardService.deleteUserCards(id);
      if (!user) throw new BadRequestException('Не удалось удалить пользователя');
      await this.userRepository.destroy({ where: { id } });
      return `Пользователь ${id} удалён`;
    } catch (e) {
      console.log(e);
      return 'Не удалось удалить пользователя';
    }
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }
}
