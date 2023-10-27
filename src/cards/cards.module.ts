import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Card } from './cards.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [SequelizeModule.forFeature([Card, User]), AuthModule],
  exports: [CardsService],
})
export class CardsModule {}
