import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { Controller, Body, Post, Get, Param } from '@nestjs/common';

@ApiTags('Роли пользователя')
@Controller('roles')
export class RolesController {
  constructor(private RolesService: RolesService) {}

  @ApiOperation({ summary: 'Создать роль (ADMIN)' })
  @Post('/addRole')
  create(@Body() dto: CreateRoleDto) {
    return this.RolesService.createRole(dto);
  }

  @ApiOperation({ summary: 'Получить роль (ADMIN)' })
  @Get('/getRole/:value')
  getByValue(@Param('value') value: string) {
    return this.RolesService.getRoleByValue(value);
  }

  @ApiOperation({ summary: 'Получить список ролей (ADMIN)' })
  @Get('/getRolesList')
  getAll() {
    return this.RolesService.getRolesList();
  }
}
