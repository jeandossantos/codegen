import { Util } from '../util.js';

const componentNameAnchor = '$componentName';

const template = `import { Router } from 'express';

import Factory from './$componentNameFactory.js';

const controller = Factory.getInstance();

const routes = Router();

routes.post('/$componentNames', controller.create.bind(controller));
routes.get('/$componentNames', controller.find.bind(controller));
routes.get('/$componentNames', controller.findById.bind(controller));
routes.put('/$componentNames/:id', controller.update.bind(controller));
routes.delete('/$componentNames/:id', controller.remove.bind(controller));

export default routes;`;

export function generateRoutesTemplate(componentName) {
  return {
    filename: `${componentName}Routes`,
    template: template.replaceAll(
      componentNameAnchor,
      Util.lowercaseFirstLetter(componentName)
    ),
  };
}
