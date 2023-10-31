import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/users-roles.model';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { PaymentSystemsModule } from './payment-systems/payment-systems.module';
import { Card } from './cards/cards.model';
import { ContactsModule } from './contacts/contacts.module';
import { Contact } from './contacts/contacts.model';
import { TransactionsModule } from './transactions/transactions.module';
import { PaymentSystem } from './payment-systems/payment-systems.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Card, Contact, PaymentSystem],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    CardsModule,
    PaymentSystemsModule,
    ContactsModule,
    TransactionsModule,
  ],
})
export class AppModule {}
