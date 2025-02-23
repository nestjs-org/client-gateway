import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { STATUS, STATUS_ORDERS } from "src/enum/status.orders";

export class PaginationOrdersDto extends PaginationDto{
    @IsOptional()
    @IsString()
    @IsEnum(STATUS_ORDERS, {
        message: 'status variants are ' + STATUS_ORDERS.join(',')
    })
    status: STATUS

}