export default `export default class ProductController {
  #productService;

  constructor({ productService }) {
    this.#productService = productService;
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
