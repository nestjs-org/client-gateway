import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { NATS_SERVICE} from "src/config";

import { catchError} from "rxjs";
import { ErrorCatchCuston } from "src/common/exceptions/error-catch";

import { PaginationOrdersDto } from "./dto/pagination-orders.dto";
import { UpdateOrderDto } from "./dto/updateOrder.dto";
import { CreateOrderDto } from "./dto/create-order.dto";


@Controller('orders')
export default class OrdersController {
    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

    @Post()
    async makeOneOrder(@Body() createOrderDto: CreateOrderDto) {
      return this.client.send({cmd:'add-one-order'},createOrderDto)
      .pipe(catchError(ErrorCatchCuston), (value) => value);
    }
    @Get()
    getall(@Query() pagination: PaginationOrdersDto) {
        return this.client.send('get-all-orders', pagination)
            .pipe(catchError(ErrorCatchCuston), (value) => value);
    }
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.client.send({ cmd: 'get-one-order' }, { id: id })
            .pipe(catchError(ErrorCatchCuston), (value) => value);
    }

    @Patch(':id')
    updateOneOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {

        return this.client.send({ cmd: 'update-status-order' }, { id: id, ...updateOrderDto })
            .pipe(catchError(ErrorCatchCuston), (value) => value)
    }

}