import { jest, describe, beforeEach, expect, test } from '@jest/globals';

import { generateControllerTemplate } from '../../src/templates/js/controllerTemplate';
import { generateFactoryTemplate } from '../../src/templates/js/factoryTemplate';

import { generateRepositoryTemplate } from '../../src/templates/js/repositoryTemplate';
import { generateServiceTemplate } from '../../src/templates/js/serviceTemplate';
import {
  repositoryTemplateMock,
  serviceTemplateMock,
  controllerTemplateMock,
  factoryTemplateMock,
} from './mocks/index.js';

describe('#generate javascript templates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
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
