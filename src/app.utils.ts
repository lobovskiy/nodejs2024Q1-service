import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import * as path from 'path';
import * as process from 'process';
import * as yaml from 'js-yaml';
import { OpenAPIObject } from '@nestjs/swagger';

export async function getYamlDocument(
  documentPath: string,
): Promise<OpenAPIObject> {
  try {
    return yaml.load(fs.readFileSync(documentPath, 'utf8')) as OpenAPIObject;
  } catch (error) {
    throw error;
  }
}

export function getCwdPath(resourcePath: string) {
  return path.join(process.cwd(), resourcePath);
}

export async function ensureFolderExists(folderPath: string) {
  await fsPromises.mkdir(folderPath, { recursive: true });
}
