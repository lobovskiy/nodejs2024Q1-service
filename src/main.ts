import * as process from 'process';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { ensureFolderExists, getCwdPath, getYamlDocument } from './app.utils';
import {
  LOGS_FOLDER_PATH,
  SWAGGER_MODULE_PATH,
  YAML_DOC_PATH,
} from './app.constants';
import { LoggingService } from './logging/logging.service';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn', 'log'],
  });
  const swaggerDocument = await getYamlDocument(YAML_DOC_PATH);
  const logsFolderPath = getCwdPath(LOGS_FOLDER_PATH);

  SwaggerModule.setup(SWAGGER_MODULE_PATH, app, swaggerDocument);

  await ensureFolderExists(logsFolderPath);

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(LoggingService));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
