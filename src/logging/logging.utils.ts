import * as fsPromises from 'fs/promises';
import * as path from 'path';

const LOG_FILENAME_PREFIX = 'log';
const LOGGING_COLOR_RESET = '\x1b[0m';

export function getCurrentLogFile(logsFolderPath: string): string {
  const currentDate = new Date();
  const fileName = `${LOG_FILENAME_PREFIX}_${
    currentDate.toISOString().split('T')[0]
  }.txt`;

  return path.join(logsFolderPath, fileName);
}

export async function getFileSize(filePath: string): Promise<number> {
  try {
    const stats = await fsPromises.stat(filePath);
    return stats.size;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return 0;
    }

    throw error;
  }
}

export async function createNewLogFile(logsFolderPath: string): Promise<void> {
  const currentDate = new Date();
  const fileName = `${LOG_FILENAME_PREFIX}_${
    currentDate.toISOString().split('T')[0]
  }_${currentDate.getTime()}.txt`;
  const newLogFile = path.join(logsFolderPath, fileName);
  await fsPromises.writeFile(newLogFile, ''); // Create an empty log file
}

export async function appendMessageToFile(
  filePath: string,
  message: string,
): Promise<void> {
  await fsPromises.appendFile(filePath, `${message}\n`);
}

export function getLogMessageCreator(appName: string, pid: number) {
  return function createLogMessage(
    datetime: string,
    messageType: string,
    message: string,
    ...optionalParams: any[]
  ) {
    return `[${appName}] ${pid} - ${datetime}\t${messageType} [${optionalParams.join(
      ', ',
    )}] ${message}`;
  };
}

export const logToConsoleInColor = {
  green: (text: string) => console.log('\x1b[32m' + text + LOGGING_COLOR_RESET),
  red: (text: string) => console.log('\x1b[31m' + text + LOGGING_COLOR_RESET),
  blue: (text: string) => console.log('\x1b[34m' + text + LOGGING_COLOR_RESET),
  yellow: (text: string) =>
    console.log('\x1b[33m' + text + LOGGING_COLOR_RESET),
};
