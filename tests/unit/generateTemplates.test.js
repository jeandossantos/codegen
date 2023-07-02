import { jest, describe, beforeEach, expect, test } from '@jest/globals';

import {
  generateRepositoryTemplate,
  generateServiceTemplate,
  generateControllerTemplate,
  generateFactoryTemplate,
  generateRoutesTemplate,
} from '../../src/templates/index.js';

import { generateRootRouteTemplate } from '../../src/templates/rootRouteTemplate.js';

import {
  repositoryTemplateMock,
  serviceTemplateMock,
  controllerTemplateMock,
  factoryTemplateMock,
  routesTemplateMock,
  rootRouteTemplate,
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
  const routesName = `${componentName}Routes`;

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

  test("should generate product's routes template", () => {
    const expected = {
      filename: routesName,
      template: routesTemplateMock,
    };

    const result = generateRoutesTemplate(componentName);

    expect(result).toStrictEqual(expected);
  });

  test('should generate root route template', () => {
    const expected = {
      template: rootRouteTemplate,
    };

    const result = generateRootRouteTemplate(componentName);

    expect(result).toStrictEqual(expected);
  });
});
