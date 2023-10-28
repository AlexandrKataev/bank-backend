import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './transactions.model';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController],
  imports: [SequelizeModule.forFeature([Transaction])],
  exports: [TransactionsService],
})
export class TransactionsModule {}
