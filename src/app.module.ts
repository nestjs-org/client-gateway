import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import OrdersModule from './orders/orders.module';

@Module({
  imports: [ProductsModule,OrdersModule, AuthModule]})
export class AppModule {}
