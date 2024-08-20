import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CardDto } from './dto/card.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post('create-payment-intent/:orderId')
  createPaymentIntent(@Param('orderId') orderId: number, @Body() card: CardDto) {
    return this.paymentsService.createPaymentIntent(orderId, card);
  }

  @Post('webhook')
  async handleWebhook(@Req() request: Request) {
    const sig = request.headers['stripe-signature'];
    // const stripeEvent = this.paymentsService.stripe.webhooks.constructEvent(
    //   request.body,
    //   sig,
    //   'YOUR_STRIPE_WEBHOOK_SECRET'
    // );

    // await this.paymentsService.handleWebhook(stripeEvent);
  }
}
