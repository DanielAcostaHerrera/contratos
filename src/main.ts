import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const httpAdapter  = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(3001);
}
bootstrap();
