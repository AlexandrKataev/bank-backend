import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from './transactions.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';

@ApiTags('Транзакции')
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}
  @ApiOperation({ summary: 'Создать транзакцию' })
  @ApiResponse({ status: 200, type: Transaction })
  @Post('/addCard')
  create(@Body() transactionDto: CreateTransactionDto) {
    return this.transactionsService.createTransaction(transactionDto);
  }

  @ApiOperation({ summary: 'Получить транзакции по карте через cardId' })
  @Get('/:cardId')
  getByValue(@Param('cardId') cardId: number) {
    return this.transactionsService.getTransactionsByCardId(cardId);
  }
}
