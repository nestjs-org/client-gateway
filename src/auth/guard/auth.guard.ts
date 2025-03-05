import { CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom, Observable } from "rxjs";
import { NATS_SERVICE } from "src/config";



export class AuthGuard implements CanActivate{
    constructor(@Inject(NATS_SERVICE)readonly client: ClientProxy){}
     async canActivate( context: ExecutionContext):Promise<boolean>  {
         const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request.headers.authorization);
        if(!token) throw new RpcException('no token ');
        const payload = await firstValueFrom(this.client.send('verify-token',token));
        if(!payload) return false;
        console.log(payload)
        request['user'] = payload;
        return true;
    }
    extractToken(header_token: string){
        console.log(header_token);
        const [type, token] = header_token?.split(' ');
        return type === 'Bearer' ? token : null;
    }
}