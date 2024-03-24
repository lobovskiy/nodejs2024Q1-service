import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { format } from 'path';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { getYamlDocument } from './app.utils';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const swaggerYamlDocumentPath = format({
    root: '/',
    dir: process.env.DOC_FOLDER_NAME || 'doc',
    base: process.env.DOC_FILE_NAME || 'api.yaml',
  });
  const swaggerDocument = await getYamlDocument(swaggerYamlDocumentPath);
  const SWAGGER_UI_PATH = 'doc';

  SwaggerModule.setup(SWAGGER_UI_PATH, app, swaggerDocument);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
