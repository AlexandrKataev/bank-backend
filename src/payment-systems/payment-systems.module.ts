import { Module } from '@nestjs/common';
import { PaymentSystemsService } from './payment-systems.service';
import { PaymentSystemsController } from './payment-systems.controller';

@Module({
  providers: [PaymentSystemsService],
  controllers: [PaymentSystemsController]
})
export class PaymentSystemsModule {}
