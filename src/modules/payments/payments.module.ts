import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';

@Module({
  controllers: [PaymentsController, InvoicesController],
  providers: [PaymentsService, InvoicesService],
})
export class PaymentsModule {}
