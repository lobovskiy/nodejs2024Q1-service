import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { getYamlDocument } from './app.utils';
import { SWAGGER_MODULE_PATH, YAML_DOC_PATH } from './app.constants';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = await getYamlDocument(YAML_DOC_PATH);

  SwaggerModule.setup(SWAGGER_MODULE_PATH, app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
