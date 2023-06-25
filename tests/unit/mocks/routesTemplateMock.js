export default `import { Router } from 'express';
import Factory from './productFactory.js';

const controller = Factory.getInstance();
const routes = Router();

routes.post('/products', controller.create);
routes.get('/products', controller.find);
routes.get('/products', controller.findById);
routes.put('/products/:id', controller.update);
routes.delete('/products/:id', controller.remove);

return routes;`;
