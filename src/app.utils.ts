import * as fs from 'fs';
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
