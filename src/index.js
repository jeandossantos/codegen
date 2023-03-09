#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';

import { createLayerIfNotExists as createPackageIfNotExists } from './createLayer.js';
import { createFilesIfNotExists } from './createFiles.js';

let { packageName: packages } = yargs(hideBin(process.argv))
  .command('create', 'create a package for the features', (builder) => {
    return builder
      .option('package-name', {
        alias: 'p',
        describe: 'The name of the package',
        demandOption: true,
        type: 'array',
      })
      .example('codegen create --package-name hero', 'create a package')
      .example('codegen create -p hero', 'create a package')
      .example(
        'codegen create --package-name user --package-name product --package-name order',
        'create several packages at once'
      )
      .example(
        'codegen create -p user -p product -p order',
        'create several packages at once'
      )
      .epilog('Copyright (c) 2023 - Jean dos Santos');
  })
  .demandCommand(1)
  .parse();

const env = process.env.NODE_ENV;
const defaultPath = env === 'dev' ? 'src-test/app' : 'src/app';

const config = {
  mainPath: '.',
  defaultPath,
};

if (!packages || packages.length === 0) {
  const help = await yargs().getHelp();
  console.log(help);

  process.exit();
}

for (let pkg of packages) {
  await createPackageIfNotExists({
    ...config,
    layer: pkg,
  });
}

const pendingFeatures = [];

for (let pkg of packages) {
  const result = createFilesIfNotExists({
    ...config,
    componentName: pkg,
  });

  pendingFeatures.push(result);
}

const results = await Promise.allSettled(pendingFeatures);

let createdFiles = [];

for (let result of results) {
  if (result.value.length > 0) {
    createdFiles = [...createdFiles, ...result.value];
  }
}

const successMessage = chalk.green.bold.underline;
const createdFile = chalk.dim.bold;

if (createdFiles.length > 0) {
  console.log(successMessage('The following files were created:'));
  createdFiles.forEach((file) => {
    console.log(createdFile(`✅ ${file.replace('./', '')}`));
  });
} else {
  console.log(chalk.dim.bold.underline('No file was created'));
}
