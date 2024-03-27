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
  const loggingService = app.get(LoggingService);
  const logsFolderPath = getCwdPath(LOGS_FOLDER_PATH);

  SwaggerModule.setup(SWAGGER_MODULE_PATH, app, swaggerDocument);

  await ensureFolderExists(logsFolderPath);

  process.on('uncaughtException', (error) => {
    loggingService.logUncaughtException(error);
    process.exit(1);
  });
  process.on('unhandledRejection', (reason) => {
    loggingService.logUnhandledRejection(reason);
    process.exit(1);
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(loggingService);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
