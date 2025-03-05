import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-one.dto';
import { UpdateProductDto } from './dto/update-one.dto';
import { catchError, firstValueFrom } from "rxjs";
import { ErrorCatchCuston } from 'src/common/exceptions/error-catch';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserDecorator } from 'src/auth/decorators/req.decorator';
import { Token } from 'src/auth/decorators/token.decorator';
@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Post()
  createOne(@Body() createOneDto: CreateProductDto) {

    return this.client.send({ cmd: 'create-product' }, createOneDto).pipe(catchError(ErrorCatchCuston), (value) => value)

  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto,@UserDecorator() user: any,@Token() token: string) {
    console.log("wwwee: ",user);
    const products = await firstValueFrom(this.client.send({ cmd: "get-all-products" }, paginationDto))
    return {
      user,
      token,
      products
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'get-one-product' }, { id: id }).pipe(catchError(ErrorCatchCuston),
      (value) => value
    )
    // try {
    //   return await firstValueFrom(this.clientProducts.send({cmd:'get-one-product'},{id: id}))
    // } catch (error) {
    //   throw new RpcException(error);

    // }
  }
  @Patch(':id')
  editOne(@Param('id', ParseIntPipe) id: number,
    @Body() updateOne: UpdateProductDto
  ) {
    return this.client.send({ cmd: 'edit-one-product' }, { ...updateOne, id })
  }
  @Delete(':id')
  deleteOne(@Param('id',ParseIntPipe) id: number){
    return this.client.send({cmd:'delete-one-product'},{id}).pipe(catchError(ErrorCatchCuston))
  }
}
