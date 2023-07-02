import { Util } from '../util.js';

const importedRouteAnchor = '$$importedRouteName';

const template = `import $$importedRouteNameRoutes from './$$importedRouteNameRoutes.js';

export function rootRoutes(app) {
  app.use($$importedRouteNameRoutes);
}`;

export function generateRootRouteTemplate(componentName) {
  return {
    template: template.replaceAll(
      importedRouteAnchor,
      Util.lowercaseFirstLetter(componentName)
    ),
  };
}
