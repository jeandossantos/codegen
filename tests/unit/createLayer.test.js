import { jest, describe, beforeEach, expect, test } from '@jest/globals';
import fs from 'fs';
import fsPromise from 'node:fs/promises';
import { createLayerIfNotExists } from '../../src/createLayer.js';

describe('#Create createLayerIfNotExists', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const layer = 'product';

  test('should not create layer if it exists', async () => {
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);
    jest.spyOn(fsPromise, fsPromise.mkdir.name).mockResolvedValue();

    const data = {
      mainPath: '',
      defaultPath: 'src-test',
      layer,
    };

    await createLayerIfNotExists(data);

    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fsPromise.mkdir).not.toHaveBeenCalled();
  });

  test('should create layer if it does not exist', async () => {
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);
    jest.spyOn(fsPromise, fsPromise.mkdir.name).mockResolvedValue();

    const data = {
      mainPath: '',
      defaultPath: 'src-test',
      layer,
    };

    await createLayerIfNotExists(data);

    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fsPromise.mkdir).toHaveBeenCalled();
  });
});
