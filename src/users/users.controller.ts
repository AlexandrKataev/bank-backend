import { UsersService } from './users.service';
import { Body, Controller, Post, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { UserVerifyGuard } from 'src/auth/user-verify.guard';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';

@ApiTags('Пользователи')
@Controller('user')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @ApiOperation({ summary: 'Получить пользователя по id (для профиля)' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(AccessTokenGuard)
  @UseGuards(UserVerifyGuard)
  @Get('/getUser/:id')
  getOne(@Param('id') id: number) {
    return this.UsersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Получить всех пользователей (ADMIN)' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/getUsersList')
  getAll() {
    return this.UsersService.getUsersList();
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('/deleteUser/:id')
  remove(@Param('id') id: number) {
    return this.UsersService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Выдать роль пользователю (ADMIN)' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/setUserRole')
  addRole(@Body() dto: AddRoleDto) {
    return this.UsersService.addRole(dto);
  }
}
