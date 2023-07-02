export default `import { Router } from 'express';

import Factory from './productFactory.js';

const controller = Factory.getInstance();

const routes = Router();

routes.post('/products', controller.create.bind(controller));
routes.get('/products', controller.find.bind(controller));
routes.get('/products', controller.findById.bind(controller));
routes.put('/products/:id', controller.update.bind(controller));
routes.delete('/products/:id', controller.remove.bind(controller));

export default routes;`;
