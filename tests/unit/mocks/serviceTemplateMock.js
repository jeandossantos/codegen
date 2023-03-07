export default `export default class ProductService {
  #productRepository;

  constructor({ productRepository }) {
    this.#productRepository = productRepository;
  }

  async create(data) {
    await this.#productRepository.create(data);
  }

  async update(id, data) {
    await this.#productRepository.update(id, data);
  }

  async findById(id) {
    await this.#productRepository.findById(id);
  }

  async find(data) {
    await this.#productRepository.find(data);
  }

  async remove(id) {
    await this.#productRepository.remove(id);
  }
}`;
