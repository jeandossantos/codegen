import { jest, describe, beforeEach, expect, test } from '@jest/globals';

import {
  generateRepositoryTemplate,
  generateServiceTemplate,
  generateControllerTemplate,
  generateFactoryTemplate,
} from '../../src/templates/index.js';

import {
  repositoryTemplateMock,
  serviceTemplateMock,
  controllerTemplateMock,
  factoryTemplateMock,
} from './mocks/index.js';

describe('#generate javascript templates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const componentName = 'product';

  const repositoryName = `${componentName}Repository`;
  const serviceName = `${componentName}Service`;
  const controllerName = `${componentName}Controller`;
  const factoryName = `${componentName}Factory`;

  test('should generate a product repository template', () => {
    const expected = {
      filename: repositoryName,
      template: repositoryTemplateMock,
    };

    const result = generateRepositoryTemplate(componentName);

    expect(result).toStrictEqual(expected);
  });

  test('should generate a product service template', () => {
    const expected = {
      filename: serviceName,
      template: serviceTemplateMock,
    };

    const result = generateServiceTemplate(componentName);

    expect(result).toStrictEqual(expected);
  });

  test('should generate a product controller template', () => {
    const expected = {
      filename: controllerName,
      template: controllerTemplateMock,
    };

    const result = generateControllerTemplate(componentName);

    expect(result).toStrictEqual(expected);
  });

  test('should generate a product factory template', () => {
    const expected = {
      filename: factoryName,
      template: factoryTemplateMock,
    };

    const result = generateFactoryTemplate(componentName);

    expect(result).toStrictEqual(expected);
  });
});
