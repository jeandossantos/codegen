export default `export default class ProductController {
  #productService;

  constructor({ productService }) {
    this.#productService = productService;
  }

  async create(request, response) {
    await this.#productService.create({});

    return response.status(501).send('not implemented!');
  }

  async update(request, response) {
    await this.#productService.update({});

    return response.status(501).send('not implemented!');
  }

  async findById(request, response) {
    await this.#productService.findById({});

    return response.status(501).send('not implemented!');
  }

  async find(request, response) {
    await this.#productService.find({});

    return response.status(501).send('not implemented!');
  }

  async remove(request, response) {
    await this.#productService.remove({});

    return response.status(501).send('not implemented!');
  }
}`;
