import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './transactions.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transaction) private transactionsRepository: typeof Transaction) {}

  async getTransactionsByCardId(cardId: number) {
    const transaction = await this.transactionsRepository.findAll({ where: { cardId } });
    return transaction;
  }

  async createTransaction(cardDto: CreateTransactionDto) {
    const transaction = await this.transactionsRepository.create(cardDto);
    return transaction;
  }
}
