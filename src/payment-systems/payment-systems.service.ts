import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentSystem } from './payment-systems.model';
import { CreatePaymentSystemDto } from './dto/create-payment-system.dto';

@Injectable()
export class PaymentSystemsService {
  constructor(@InjectModel(PaymentSystem) private paymentSystemsRepository: typeof PaymentSystem) {}

  async createPaymentSystem(dto: CreatePaymentSystemDto) {
    const paymentSystem = await this.paymentSystemsRepository.create(dto);
    return paymentSystem;
  }

  async getPaymentSystemByValue(value: string) {
    const paymentSystem = await this.paymentSystemsRepository.findOne({ where: { value } });
    return paymentSystem;
  }

  async getPaymentSystemsList() {
    const paymentSystem = await this.paymentSystemsRepository.findAll({ include: { all: true } });
    return paymentSystem;
  }
}
