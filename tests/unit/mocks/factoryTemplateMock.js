export default `import ProductRepository from './productRepository.js';
import ProductService from './productService.js';
import ProductController from './productController.js';

export default class ProductFactory {
  static getInstance() {
    const productRepository = new ProductRepository();

    const productService = new ProductService({
      productRepository,
    });

    const controller = new ProductController({
      productService,
    });

    return controller;
  }
}`;
