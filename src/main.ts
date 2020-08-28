import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UI as bullUI } from 'bull-board';

import { AppModule } from '@/app.module';
import { APP_PORT } from '@config/Constants';
import { ValidationPipe, NestApplicationOptions } from '@nestjs/common';
import { Logger } from '@shared/logger/Logger';


async function bootstrap() {
  const appOptions: NestApplicationOptions = {
    cors: false,
    logger: false
  };
  const app = await NestFactory.create(AppModule, appOptions);

  app.useLogger(new Logger());

  const options = new DocumentBuilder()
    .setTitle('Decole Api')
    .setDescription('API da Decole')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
  app.use('/admin/queues', bullUI);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(APP_PORT);
  console.log(`Server running on the port ${APP_PORT}`)
}
bootstrap();
