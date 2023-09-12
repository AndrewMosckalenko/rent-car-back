import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import initDB from './initialDB';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.SERVER_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Rent app')
    .setDescription('Api for rent app')
    .setVersion('1.0')
    .addTag('rent-app')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-config', app, document);

  await initDB();
  await app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}
bootstrap();
