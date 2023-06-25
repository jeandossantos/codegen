import { Util } from '../util.js';

const componentNameAnchor = '$componentName';

const template = `import { Router } from 'express';
import Factory from './$componentNameFactory.js';

const controller = Factory.getInstance();
const routes = Router();

routes.post('/$componentNames', controller.create);
routes.get('/$componentNames', controller.find);
routes.get('/$componentNames', controller.findById);
routes.put('/$componentNames/:id', controller.update);
routes.delete('/$componentNames/:id', controller.remove);

return routes;`;

export function generateRoutesTemplate(componentName) {
  return {
    filename: `${componentName}Routes`,
    template: template.replaceAll(
      componentNameAnchor,
      Util.lowercaseFirstLetter(componentName)
    ),
  };
}
