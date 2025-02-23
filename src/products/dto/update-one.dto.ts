import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-one.dto";

export class UpdateProductDto extends PartialType(CreateProductDto){}