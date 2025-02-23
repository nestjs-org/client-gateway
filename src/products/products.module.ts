import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {NATS_SERVICE } from 'src/config';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers:[ProductsController],
  imports: [
    ProductsModule,
    NatsModule
  ],
})
export class ProductsModule {

}
