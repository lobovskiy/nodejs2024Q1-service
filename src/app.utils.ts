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

export async function createFolder(folderPath: string) {
  const isFolderExist = await fsPromises
    .access(folderPath)
    .then(() => true)
    .catch(() => false);

  if (!isFolderExist) {
    await fsPromises.mkdir(folderPath);
  }
}
