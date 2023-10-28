import { Module } from '@nestjs/common';
import { PaymentSystemsService } from './payment-systems.service';
import { PaymentSystemsController } from './payment-systems.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentSystem } from './payment-systems.model';

@Module({
  providers: [PaymentSystemsService],
  controllers: [PaymentSystemsController],
  imports: [SequelizeModule.forFeature([PaymentSystem])],
  exports: [PaymentSystemsService],
})
export class PaymentSystemsModule {}
