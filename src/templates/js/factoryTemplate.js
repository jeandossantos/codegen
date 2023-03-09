import { Util } from '../../util.js';

const componentNameAnchor = '$$componentName';
const repositoryNameAnchor = '$$repositoryName';
const serviceNameAnchor = '$$serviceName';
const controllerNameAnchor = '$$controllerName';

const repositoryFilenameAnchor = '$$repositoryFilename';
const serviceFilenameAnchor = '$$serviceFilename';
const controllerFilenameAnchor = '$$controllerFilename';

const repositoryInstanceAnchor = '$$repositoryInstance';
const serviceInstanceAnchor = '$$serviceInstance';

const template = `import $$repositoryNameRepository from './$$repositoryFilenameRepository.js';
import $$serviceNameService from './$$serviceFilenameService.js';
import $$controllerNameController from './$$controllerFilenameController.js';

export default class $$componentNameFactory {
  static getInstance() {
    const $$repositoryInstanceRepository = new $$repositoryNameRepository();

    const $$serviceInstanceService = new $$serviceNameService({
      $$repositoryInstanceRepository,
    });

    const controller = new $$controllerNameController({
      $$serviceInstanceService,
    });

    return controller;
  }
}`;

export function generateFactoryTemplate(componentName) {
  return {
    filename: `${Util.lowercaseFirstLetter(componentName)}Factory`,
    template: template
      .replaceAll(componentNameAnchor, Util.uppercaseFirstLetter(componentName))
      .replaceAll(
        repositoryNameAnchor,
        Util.uppercaseFirstLetter(componentName)
      )
      .replaceAll(serviceNameAnchor, Util.uppercaseFirstLetter(componentName))
      .replaceAll(
        controllerNameAnchor,
        Util.uppercaseFirstLetter(componentName)
      )
      .replaceAll(
        repositoryFilenameAnchor,
        Util.lowercaseFirstLetter(componentName)
      )
      .replaceAll(
        serviceFilenameAnchor,
        Util.lowercaseFirstLetter(componentName)
      )
      .replaceAll(
        controllerFilenameAnchor,
        Util.lowercaseFirstLetter(componentName)
      )
      .replaceAll(
        repositoryInstanceAnchor,
        Util.lowercaseFirstLetter(componentName)
      )
      .replaceAll(
        serviceInstanceAnchor,
        Util.lowercaseFirstLetter(componentName)
      ),
  };
}
