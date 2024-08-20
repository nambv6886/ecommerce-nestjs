import { Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class PaypalService {
  private environment: paypal.core.SandboxEnvironment;
  private client: paypal.core.PayPalHttpClient;

  constructor(private ordersService: OrdersService) {
    this.environment = new paypal.core.SandboxEnvironment('CLIENT_ID', 'CLIENT_SECRET');
    this.client = new paypal.core.PayPalHttpClient(this.environment);
  }

  async createOrder(orderId: number) {
    const order = await this.ordersService.findOrderById(orderId);

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: order.total.toString(),
        },
      }],
    });

    const response = await this.client.execute(request);
    return response.result;
  }

  async captureOrder(orderId: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const response = await this.client.execute(request);
    return response.result;
  }
}