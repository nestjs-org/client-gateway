import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const Token = createParamDecorator((data:unknown,context:ExecutionContext)=>{
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization ? request.headers.authorization.split(' ')[1] : null;
    return token
})