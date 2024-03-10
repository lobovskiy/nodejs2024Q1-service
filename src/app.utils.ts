import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as uuid from 'uuid';
import { OpenAPIObject } from '@nestjs/swagger';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export async function getYamlDocument(
  documentPath: string,
): Promise<OpenAPIObject> {
  try {
    return yaml.load(fs.readFileSync(documentPath, 'utf8')) as OpenAPIObject;
  } catch (error) {
    throw error;
  }
}

export function getCollectionEntityIndexById(
  entityCollection: any[],
  id: string,
  entityName?: string,
) {
  const index = entityCollection.findIndex((album) => album.id === id);

  if (index < 0) {
    const errorMessage = entityName
      ? `${entityName} ${id} not found`
      : `Id ${id} not found`;

    throw new NotFoundException(errorMessage);
  }

  return index;
}

export function validateUuid(id: string, fieldReferredToId?: string) {
  const errorMessage = fieldReferredToId
    ? `Id ${id} in ${fieldReferredToId} is not valid uuid`
    : `Id ${id} is not valid uuid`;

  if (!uuid.validate(id)) {
    throw new BadRequestException(errorMessage);
  }
}

export function validateCollectionEntity(
  collection: any[],
  entityId: string,
  collectionName?: string,
  fieldReferredToId?: string,
) {
  validateUuid(entityId, fieldReferredToId);

  let errorMessage = fieldReferredToId
    ? `Item with id ${entityId} in ${fieldReferredToId} not found`
    : `Item with id ${entityId} not found`;

  if (collectionName) {
    errorMessage += ` in ${collectionName}`;
  }

  const entity = collection.find((entity) => entity.id === entityId);

  if (!entity) {
    throw new NotFoundException(errorMessage);
  }
}
