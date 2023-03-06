import fsPromise from 'node:fs/promises';
import fs from 'node:fs';

export async function createLayerIfNotExists({ mainPath, defaultPath, layer }) {
  const path = `${mainPath}/${defaultPath}`;

  const layerExists = fs.existsSync(`${path}/${layer}`);

  let pendingPromise = undefined;

  if (!layerExists) {
    pendingPromise = fsPromise.mkdir(`${path}/${layer}`, {
      recursive: true,
    });
  }

  return Promise.all([pendingPromise]);
}
