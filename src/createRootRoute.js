import fsPromise from 'node:fs/promises';
import fs from 'node:fs';

import { generateRootRouteTemplate } from '../src/templates/rootRouteTemplate.js';

const startBodyFn = '\nexport function rootRoutes(app) {\n';

export async function createRootRouteIfNotExists({ mainPath, componentName }) {
  const targetFolder = `${mainPath}/routes`;
  const filePath = `${targetFolder}/index.js`;

  const fileAlreadyExists = fs.existsSync(filePath);
  const targetFolderExists = fs.existsSync(targetFolder);

  if (!targetFolderExists) await fsPromise.mkdir(targetFolder);

  let txtFile;

  if (fileAlreadyExists) {
    const rootRouteContent = await fsPromise.readFile(filePath, 'utf8');

    txtFile = generateUpdatedRootRoute(rootRouteContent, componentName);
  } else {
    txtFile = generateRootRouteTemplate(componentName).template;
  }

  await fsPromise.writeFile(filePath, txtFile);
}

function generateUpdatedRootRoute(currentRootRoute, componentName) {
  const { importRoute, importTemplate } = generateImportTemplate(componentName);

  const routeAlreadyImported = currentRootRoute.includes(importTemplate);

  if (currentRootRoute.includes(startBodyFn)) {
    if (routeAlreadyImported) return currentRootRoute;

    return importTemplate.concat(
      currentRootRoute.replace(
        startBodyFn,
        `${startBodyFn}  app.use(${importRoute});\n`
      )
    );
  }

  return generateRootRouteTemplate(componentName).template;
}

function generateImportTemplate(componentName) {
  const importRoute = `${componentName}Routes`;
  const importTemplate = `import ${importRoute} from './${importRoute}.js';\n`;

  return {
    importRoute,
    importTemplate,
  };
}
