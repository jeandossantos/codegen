import { Util } from '../../util.js';

const componentNameAnchor = '$$componentName';
const repositoryAnchor = '$$repositoryAnchor';

const template = `export default class $$componentNameService {
  #productRepository;

  constructor({ $$repositoryAnchorRepository }) {
    this.#$$repositoryAnchorRepository = $$repositoryAnchorRepository;
  }

  async create(data) {
    return Promise.reject('method create is not implemented!');
  }

  async update(id, data) {
    return Promise.reject('method update is not implemented!');
  }

  async findById(id) {
    return Promise.reject('method findById is not implemented!');
  }

  async find(data) {
    return Promise.reject('method find is not implemented!');
  }

  async remove(id) {
    return Promise.reject('method remove is not implemented!');
  }
}`;

export function generateServiceTemplate(componentName) {
  return {
    filename: `${Util.lowercaseFirstLetter(componentName)}Service`,
    template: template
      .replaceAll(componentNameAnchor, Util.uppercaseFirstLetter(componentName))
      .replaceAll(repositoryAnchor, Util.lowercaseFirstLetter(componentName)),
  };
}
