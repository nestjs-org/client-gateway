import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor( @Inject(NATS_SERVICE) readonly client: ClientProxy, private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto){
    return firstValueFrom(this.client.send('login',loginDto)).catch(err =>{
      throw new RpcException(err)
    })
  }
  @Post('/register')
  async register(@Body() registerDto: RegisterDto){
    return await firstValueFrom(this.client.send('register',registerDto)).catch(err =>{
      throw new RpcException(err)
    })
  }

  @Post('/validate-token')
  validateToken(){

  }
}
