import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { OrdersModule } from '../orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { CartModule } from '../cart/cart.module';
import { Payment } from './entities/payment.entity';
import { Order } from '../orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order]), OrdersModule, CartModule],
  controllers: [PaymentsController, InvoicesController],
  providers: [PaymentsService, InvoicesService],
})
export class PaymentsModule { }
