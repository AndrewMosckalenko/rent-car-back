import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import initDB from './initialDB';

const port = process.env.SERVER_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await initDB();
  await app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}
bootstrap();
