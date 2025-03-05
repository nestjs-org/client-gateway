import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustonExceptionFilter } from './common/exceptions/exception-filters';
async function bootstrap() {
  const logger = new Logger();
  console.log('klk')
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  app.useGlobalFilters(new RpcCustonExceptionFilter());
  await app.listen(envs.port);
  logger.log('client-gateway running on port ', envs.port);
}
bootstrap();
