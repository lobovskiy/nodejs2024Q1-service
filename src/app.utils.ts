import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as uuid from 'uuid';
import { OpenAPIObject } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';

export async function getYamlDocument(
  documentPath: string,
): Promise<OpenAPIObject> {
  try {
    return yaml.load(fs.readFileSync(documentPath, 'utf8')) as OpenAPIObject;
  } catch (error) {
    throw error;
  }
}

export function validateUuid(value: string, key: string) {
  if (!uuid.validate(value)) {
    throw new BadRequestException(`${key} ${value} is not valid uuid`);
  }
}
