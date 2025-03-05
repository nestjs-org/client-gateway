import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const UserDecorator = createParamDecorator((data:unknown,context:ExecutionContext)=>{
    console.log('segundo');
    
        const req = context.switchToHttp().getRequest();
        const user = req.user
        return user
})