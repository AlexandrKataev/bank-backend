import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './cards.model';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card) private cardsRepository: typeof Card) {}

  async getCardById(cardId: number) {
    const card = await this.cardsRepository.findByPk(cardId);
    return card;
  }

  async getCardsByUserId(userId: number) {
    const cards = await this.cardsRepository.findAll({ where: { userId } });
    return cards;
  }

  async getAllCards() {
    const cards = await this.cardsRepository.findAll({ include: { all: true } });
    return cards;
  }

  async createCard(cardDto: CreateCardDto) {
    const card = await this.cardsRepository.create(cardDto);
    return card;
  }

  async deleteCard(cardId: number) {
    try {
      await this.cardsRepository.destroy({ where: { id: cardId } });
      return `Карта ${cardId} удалена`;
    } catch (e) {
      console.log(e);
      return 'Не удалось удалить карту';
    }
  }
}
