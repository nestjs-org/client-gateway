import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Response } from "express";

export class RpcCustonExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const response: Response =  host.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        console.log(exception.getError())
        const handleEmptyResponseException = exception.getError().toString().match(/\(/);
        let error;
        if(handleEmptyResponseException) response.status(500).send({
            errorStatus: HttpStatus.BAD_REQUEST,
            message:handleEmptyResponseException.input?.substring(0,Number(handleEmptyResponseException.index) - 1)
        })
        if(exception instanceof HttpException) error = exception.getResponse();
        if(exception instanceof RpcException && 'getError' in exception) error = exception.getError();
        return response.status(statusCode).send(error ?? exception.message);
    }

}