import { CardsService } from './cards.service';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Card } from './cards.model';
import { CreateCardDto } from './dto/create-card.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Карты')
@Controller('card')
export class CardsController {
  constructor(private CardsService: CardsService) {}

  @ApiOperation({ summary: 'Создать карту' })
  @ApiResponse({ status: 200, type: Card })
  @Post('/addCard')
  create(@Body() cardDto: CreateCardDto) {
    return this.CardsService.createCard(cardDto);
  }

  @ApiOperation({ summary: 'Получить все карты (ADMIN)' })
  @ApiResponse({ status: 200, type: [Card] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/getAllCardList')
  getAll() {
    return this.CardsService.getAllCards();
  }

  @ApiOperation({ summary: 'Получить карту по id' })
  @Get('/getCard/:cardId')
  getByValue(@Param('cardId') cardId: number) {
    return this.CardsService.getCardById(cardId);
  }

  @ApiOperation({ summary: 'Получить карты пользователя по userId' })
  @Get('/getUserCardList/:userId')
  getByUserId(@Param('userId') userId: number) {
    return this.CardsService.getCardsByUserId(userId);
  }

  @ApiOperation({ summary: 'Удалить карту' })
  @Delete('/deleteCard/:cardId')
  remove(@Param('cardId') cardId: number) {
    return this.CardsService.deleteCard(cardId);
  }
}
