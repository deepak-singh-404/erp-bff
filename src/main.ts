import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api");
  app.getHttpAdapter().getInstance().set('trust proxy', 1);
  await app.listen(3000);
}
bootstrap();
