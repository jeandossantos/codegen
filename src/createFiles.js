import fsPromise from 'node:fs/promises';
import fs from 'node:fs';

import * as templates from './templates/index.js';

export async function createFilesIfNotExists({
  mainPath,
  defaultPath,
  componentName,
}) {
  const pkg = componentName;
  const targetFolder = `${mainPath}/${defaultPath}/${pkg}`;
  const templatesKeys = Object.keys(templates);

  const writtenFiles = [];

  for (const template of templatesKeys) {
    const { filename, template: txtFile } = templates[template](componentName);
    const filePath = `${targetFolder}/${filename}.js`;

    const fileAlreadyExists = fs.existsSync(filePath);

    if (fileAlreadyExists) continue;

    await fsPromise.writeFile(filePath, txtFile);

    writtenFiles.push(filePath);
  }

  return writtenFiles;
}
