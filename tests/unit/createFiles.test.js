import { jest, describe, beforeEach, expect, test } from '@jest/globals';
import fsPromise from 'node:fs/promises';
import fs from 'node:fs';

import * as templates from '../../src/templates/js/index.js';

import { createFilesIfNotExists } from '../../src/createFiles.js';

describe('#generate javascript templates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const componentName = 'product';

  const templatesLength = Object.keys(templates).length;

  test('should not create a file if it already exists', async () => {
    jest.spyOn(fsPromise, fsPromise.writeFile.name).mockResolvedValue();

    jest
      .spyOn(fs, fs.existsSync.name)
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    const data = {
      mainPath: '',
      defaultPath: 'src-test/app',
      componentName,
    };

    await createFilesIfNotExists(data);

    expect(fs.existsSync).toHaveBeenCalledTimes(templatesLength);
    expect(fsPromise.writeFile).toHaveBeenCalledTimes(templatesLength - 1);
  });

  test('should create files if they does not exists', async () => {
    jest.spyOn(fsPromise, fsPromise.writeFile.name).mockResolvedValue();

    const data = {
      mainPath: '',
      defaultPath: 'src-test/app',
      componentName,
    };

    await createFilesIfNotExists(data);

    expect(fsPromise.writeFile).toHaveBeenCalledTimes(templatesLength);
  });
});
