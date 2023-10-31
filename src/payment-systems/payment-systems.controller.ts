import { Controller, Body, Param, Get, Post } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePaymentSystemDto } from './dto/create-payment-system.dto';
import { PaymentSystemsService } from './payment-systems.service';

@ApiTags('Платёжные системы')
@Controller('paymentSystems')
export class PaymentSystemsController {
  constructor(private paymentSystemsService: PaymentSystemsService) {}

  @ApiOperation({ summary: 'Создать платёжную систему (ADMIN)' })
  @Post('/addPaymentSystem')
  create(@Body() dto: CreatePaymentSystemDto) {
    return this.paymentSystemsService.createPaymentSystem(dto);
  }

  @ApiOperation({ summary: 'Получить платёжную систему (ADMIN)' })
  @Get('/getPaymentSystem/:value')
  getByValue(@Param('value') value: string) {
    return this.paymentSystemsService.getPaymentSystemByValue(value);
  }

  @ApiOperation({ summary: 'Получить список платёжных систем (ADMIN)' })
  @Get('/getPaymentSystemsList')
  getAll() {
    return this.paymentSystemsService.getPaymentSystemsList();
  }
}
