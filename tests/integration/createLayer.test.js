import {
  jest,
  describe,
  beforeEach,
  beforeAll,
  afterAll,
  expect,
  test,
} from '@jest/globals';
import fsPromise from 'node:fs/promises';
import { createLayerIfNotExists } from '../../src/createLayer.js';
import path from 'node:path';
import { tmpdir } from 'node:os';

describe('#generate javascript templates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const config = {
    mainPath: '',
    defaultPath: 'src/app',
    layer: 'product',
  };

  beforeAll(async () => {
    config.mainPath = await fsPromise.mkdtemp(path.join(tmpdir(), 'codegen-'));
  });

  afterAll(async () => {
    await fsPromise.rm(config.mainPath, {
      recursive: true,
      force: true,
    });
  });

  test('should create layer if it does not exist', async () => {
    const beforeRun = await fsPromise.readdir(config.mainPath);

    await createLayerIfNotExists(config);

    const afterRun = await fsPromise.readdir(
      path.join(config.mainPath, config.defaultPath)
    );

    expect(beforeRun).not.toStrictEqual(afterRun);
    expect(afterRun[0]).toStrictEqual(config.layer);
  });
});
