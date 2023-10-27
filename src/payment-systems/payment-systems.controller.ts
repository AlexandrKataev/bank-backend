import { Controller } from '@nestjs/common';
import { PaymentSystemsService } from './payment-systems.service';

@Controller('payment-systems')
export class PaymentSystemsController {
  constructor(private PaymentSystemsService: PaymentSystemsService) {}
}
