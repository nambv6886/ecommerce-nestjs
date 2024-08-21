import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Stripe } from 'stripe';
import { Order } from '../orders/entities/order.entity';
import { CardDto } from './dto/card.dto';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    // private usersService: UsersService,
  ) {
    this.stripe = new Stripe('YOUR_STRIPE_SECRET_KEY', {
      // apiVersion: '2022-11-15',
    });
  }

  async createPaymentIntent(orderId: number, card: CardDto): Promise<Stripe.PaymentIntent> {
    const order = await this.ordersRepository.findOne({
      where: {
        id: orderId,
      },
      relations: ['user', 'items', 'items.product']
    });
    if (!order) {
      throw new BadRequestException('Order not found');
    }

    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: Math.round(order.total * 100),
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
      metadata: {
        orderId: order.id.toString(),
      }
    });


    // const paymentIntent = await this.stripe.paymentIntents.create({
    //   amount: Math.round(order.total * 100), // Stripe amount is in cents
    //   currency: 'usd',
    //   metadata: { orderId: order.id.toString() },
    // });

    return paymentIntent;
  }

  async handleWebhook(event: Stripe.Event): Promise<void> {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const orderId = paymentIntent.metadata.orderId;

      const order = await this.ordersRepository.findOneBy({ id: +orderId });
      if (order) {
        order.status = 'paid';
        await this.ordersRepository.save(order);
      }
    }
  }
}