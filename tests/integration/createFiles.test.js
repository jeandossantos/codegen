import {
  jest,
  describe,
  test,
  expect,
  beforeEach,
  beforeAll,
  afterAll,
} from '@jest/globals';
import { tmpdir } from 'node:os';
import fsPromise from 'node:fs/promises';

import { createFilesIfNotExists } from '../../src/createFiles.js';
import { createLayerIfNotExists } from '../../src/createLayer.js';
import path from 'node:path';

function getFilePath({ mainPath, defaultPath, layer }, filename) {
  return path.join(mainPath, defaultPath, layer, filename);
}

describe('#Integration - create files', () => {
  const config = {
    mainPath: '',
    defaultPath: 'src/app',
    layer: 'product',
  };

  const packageJsonLocation = path.join(
    './tests/integration/mocks',
    'package.json'
  );

  beforeAll(async () => {
    config.mainPath = await fsPromise.mkdtemp(path.join(tmpdir(), 'codegen-'));

    await fsPromise.copyFile(
      packageJsonLocation,
      path.join(config.mainPath, 'package.json')
    );

    await createLayerIfNotExists({ ...config, componentName: config.layer });
  });

  afterAll(async () => {
    await fsPromise.rm(config.mainPath, {
      recursive: true,
      force: true,
    });
  });

  const repositoryName = `${config.layer}Repository.js`;
  const serviceName = `${config.layer}Service.js`;
  const controllerName = `${config.layer}Controller.js`;
  const factoryName = `${config.layer}Factory.js`;

  test('should create ProductRepository class correctly', async () => {
    await createFilesIfNotExists({ ...config, componentName: config.layer });

    const repositoryPath = getFilePath(config, repositoryName);

    const { default: Repository } = await import(repositoryPath);

    const repository = new Repository();

    const expectedNotImplemented = (func) => {
      expect(() => func.call()).rejects.toEqual(
        `method ${func.name} is not implemented!`
      );
    };

    expectedNotImplemented(repository.create);
    expectedNotImplemented(repository.update);
    expectedNotImplemented(repository.find);
    expectedNotImplemented(repository.findById);
    expectedNotImplemented(repository.remove);
  });

  test('should create ProductService class correctly', async () => {
    await createFilesIfNotExists({ ...config, componentName: config.layer });

    const repositoryPath = getFilePath(config, repositoryName);
    const servicePath = getFilePath(config, serviceName);

    const { default: Repository } = await import(repositoryPath);
    const { default: Service } = await import(servicePath);

    const repository = new Repository();
    const service = new Service({ productRepository: repository });

    const expectedNotImplemented = (func) => {
      expect(() => func.call(service)).rejects.toEqual(
        `method ${func.name} is not implemented!`
      );
    };

    expectedNotImplemented(service.create);
    expectedNotImplemented(service.update);
    expectedNotImplemented(service.find);
    expectedNotImplemented(service.findById);
    expectedNotImplemented(service.remove);
  });

  test('should create ProductController class correctly', async () => {
    await createFilesIfNotExists({ ...config, componentName: config.layer });

    const repositoryPath = getFilePath(config, repositoryName);
    const servicePath = getFilePath(config, serviceName);
    const controllerPath = getFilePath(config, controllerName);

    const { default: Repository } = await import(repositoryPath);
    const { default: Service } = await import(servicePath);
    const { default: Controller } = await import(controllerPath);

    const repository = new Repository();
    const service = new Service({ productRepository: repository });
    const controller = new Controller({ productService: service });

    const expectedNotImplemented = (func) => {
      expect(() => func.call(controller)).rejects.toEqual(
        `method ${func.name} is not implemented!`
      );
    };

    expectedNotImplemented(controller.create);
    expectedNotImplemented(controller.update);
    expectedNotImplemented(controller.find);
    expectedNotImplemented(controller.findById);
    expectedNotImplemented(controller.remove);
  });

  test('should create ProductFactory class correctly', async () => {
    await createFilesIfNotExists({ ...config, componentName: config.layer });

    const controllerPath = getFilePath(config, controllerName);
    const factoryPath = getFilePath(config, factoryName);

    const { default: Controller } = await import(controllerPath);
    const { default: Factory } = await import(factoryPath);

    const factory = Factory.getInstance();

    expect(factory).toBeInstanceOf(Controller);
  });
});
