import { ArrayMinSize, IsArray, IsString, ValidateNested  } from "class-validator";

import { Type } from "class-transformer";
import { OrderItemDto } from "./order-item.dto";
export class CreateOrderDto {
    
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type(()=> OrderItemDto)
    item: OrderItemDto[]
}
