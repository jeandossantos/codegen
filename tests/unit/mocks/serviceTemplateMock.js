export default `export default class ProductService {
  #productRepository;

  constructor({ productRepository }) {
    this.#productRepository = productRepository;
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
