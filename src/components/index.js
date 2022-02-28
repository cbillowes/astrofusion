import loadable from '@loadable/component';


export const Button = loadable(() => import('./Button'), { resolveComponent: (component) => component.default });
export const PrimaryButton = loadable(() => import('./Button'), { resolveComponent: (component) => component.PrimaryButton });
export const Text = loadable(() => import('./Text'), { resolveComponent: (component) => component.default });
