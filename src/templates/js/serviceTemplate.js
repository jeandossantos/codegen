import { Util } from '../../util.js';

const componentNameAnchor = '$$componentName';
const repositoryAnchor = '$$repositoryAnchor';

const template = `export default class $$componentNameService {
  #$$repositoryAnchorRepository;

  constructor({ $$repositoryAnchorRepository }) {
    this.#$$repositoryAnchorRepository = $$repositoryAnchorRepository;
  }

  async create(data) {
    await this.#$$repositoryAnchorRepository.create(data);
  }

  async update(id, data) {
    await this.#$$repositoryAnchorRepository.update(id, data);
  }

  async findById(id) {
    await this.#$$repositoryAnchorRepository.findById(id);
  }

  async find(data) {
    await this.#$$repositoryAnchorRepository.find(data);
  }

  async remove(id) {
    await this.#$$repositoryAnchorRepository.remove(id);
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
