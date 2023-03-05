import fsPromise from 'node:fs/promises';
import fs from 'node:fs';

import * as templates from './templates/js/index.js';

export async function createFilesIfNotExists({
  mainPath,
  defaultPath,
  componentName,
}) {
  const layer = componentName;
  const targetFolder = `${mainPath}/${defaultPath}/${layer}`;

  const templatesKeys = Object.keys(templates);

  const pendingPromises = [];

  for (const template of templatesKeys) {
    const { filename, template: txtFile } = templates[template](componentName);

    const fileAlreadyExists = fs.existsSync(`${targetFolder}/${filename}.js`);

    if (fileAlreadyExists) continue;

    const promise = fsPromise.writeFile(
      `${targetFolder}/${filename}.js`,
      txtFile
    );

    pendingPromises.push(promise);
  }

  return Promise.all(pendingPromises);
}
