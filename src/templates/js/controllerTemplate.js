import { Util } from '../../util.js';

const componentNameAnchor = '$$componentName';
const serviceAnchor = '$$serviceAnchor';

const template = `export default class $$componentNameController {
  #$$serviceAnchorService;

  constructor({ $$serviceAnchorService }) {
    this.#$$serviceAnchorService = $$serviceAnchorService;
  }

  async create(request, response) {
    return response.status(501).send('not implemented!');
  }

  async update(request, response) {
    return response.status(501).send('not implemented!');
  }

  async findById(request, response) {
    return response.status(501).send('not implemented!');
  }

  async find(request, response) {
    return response.status(501).send('not implemented!');
  }

  async remove(request, response) {
    return response.status(501).send('not implemented!');
  }
}`;

export function generateControllerTemplate(componentName) {
  return {
    filename: `${Util.lowercaseFirstLetter(componentName)}Controller`,
    template: template
      .replaceAll(componentNameAnchor, Util.uppercaseFirstLetter(componentName))
      .replaceAll(serviceAnchor, Util.lowercaseFirstLetter(componentName)),
  };
}
