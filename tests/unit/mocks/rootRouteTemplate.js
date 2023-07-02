export default `import productRoutes from './productRoutes.js';

export function rootRoutes(app) {
  app.use(productRoutes);
}`;
