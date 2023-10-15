import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { Controller, Body, Post, Get, Param } from '@nestjs/common';

@Controller('roles')
export class RolesController {
  constructor(private RolesService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.RolesService.createRole(dto);
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.RolesService.getRoleByValue(value);
  }
}
