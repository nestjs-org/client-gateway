import { Module } from "@nestjs/common";
import OrdersController from "./orders.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { envs, NATS_SERVICE } from "src/config";
import { NatsModule } from "src/transports/nats.module";



@Module({
    imports:[NatsModule],
    controllers:[OrdersController],
})
export default class OrdersModule{}