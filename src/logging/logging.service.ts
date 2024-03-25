import * as process from 'process';
import { Injectable, LoggerService } from '@nestjs/common';
import { ensureFolderExists, getCwdPath } from '../app.utils';
import { APP_NAME, LOGGING_LEVELS, LOGS_FOLDER_PATH } from '../app.constants';
import {
  appendMessageToFile,
  createNewLogFile,
  getCurrentLogFile,
  getFileSize,
  getLogMessageCreator,
  logToConsoleInColor,
} from './logging.utils';

@Injectable()
export class LoggingService implements LoggerService {
  private logsFolderPath = getCwdPath(LOGS_FOLDER_PATH);

  private maxLogFileSize = Number(process.env.MAX_FILE_SIZE_BYTES) || 10000;

  private level = Number(process.env.LOGGING_LEVEL ?? 2);

  private createLogMessage = getLogMessageCreator(APP_NAME, process.pid);

  public async log(message: string, ...optionalParams: any[]) {
    if (this.level >= LOGGING_LEVELS.Log) {
      const datetime = new Date().toLocaleString('ru-RU');
      const logMessage = this.createLogMessage(
        datetime,
        'LOG',
        message,
        optionalParams,
      );

      logToConsoleInColor.blue(logMessage);
      await this.writeToLogFile(logMessage);
    }
  }

  public async error(message: string, ...optionalParams: any[]) {
    if (this.level >= LOGGING_LEVELS.Error) {
      const datetime = new Date().toLocaleString('ru-RU');
      const logMessage = this.createLogMessage(
        datetime,
        'ERR',
        message,
        optionalParams,
      );

      logToConsoleInColor.red(logMessage);
      await this.writeToLogFile(message);
    }
  }

  public async warn(message: string, ...optionalParams: any[]) {
    if (this.level >= LOGGING_LEVELS.Warn) {
      const datetime = new Date().toLocaleString('ru-RU');
      const logMessage = this.createLogMessage(
        datetime,
        'WARN',
        message,
        optionalParams,
      );

      logToConsoleInColor.yellow(logMessage);
      await this.writeToLogFile(message);
    }
  }

  public async debug?(message: string, ...optionalParams: any[]) {
    if (this.level >= LOGGING_LEVELS.Debug) {
      const datetime = new Date().toLocaleString('ru-RU');
      const logMessage = this.createLogMessage(
        datetime,
        'DEBUG',
        message,
        optionalParams,
      );

      logToConsoleInColor.green(logMessage);
      await this.writeToLogFile(message);
    }
  }

  public async verbose(message: string, ...optionalParams: any[]) {
    if (this.level >= LOGGING_LEVELS.Verbose) {
      const datetime = new Date().toLocaleString('ru-RU');
      const logMessage = this.createLogMessage(
        datetime,
        'VERBOSE',
        message,
        optionalParams,
      );

      logToConsoleInColor.green(logMessage);
      await this.writeToLogFile(message);
    }
  }

  public async logUncaughtException(error: Error) {
    await this.error(
      `Uncaught exception ${error.name}: ${error.message}\n${error.stack}`,
    );
  }

  public async logUnhandledRejection(reason: unknown) {
    if (reason instanceof Error) {
      await this.error(
        `Unhandled rejection: ${reason.message}\n${reason.stack}`,
      );
    } else {
      await this.error(`Unhandled rejection: ${reason.toString()}`);
    }
  }

  private async writeToLogFile(message: string) {
    await ensureFolderExists(this.logsFolderPath);

    const currentLogFile = getCurrentLogFile(this.logsFolderPath);
    const currentLogFileSize = await getFileSize(currentLogFile);

    if (currentLogFileSize >= this.maxLogFileSize) {
      await createNewLogFile(this.logsFolderPath);
    }

    await appendMessageToFile(currentLogFile, message);
  }
}
