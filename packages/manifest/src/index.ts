import type {
  DataInitializer,
  ElementData,
  ElementManifest,
} from './interfaces';

// Element unique id within the target system (e.g. Tailor)
export const type = 'CE_TRUE_FALSE';

// Display name (e.g. shown to the author)
export const name = 'True - False';

// Function which inits element state (data property on the Content Element
// entity)
// e.g. for simple counter component:
export const initState: DataInitializer = (): ElementData => ({
  question: '',
  correct: null,
});

// Can be loaded from package.json
export const version = '1.0';

// UI configuration for Tailor CMS
const ui = {
  // Display icon, https://pictogrammers.com/library/mdi/
  icon: 'mdi-toggle-switch',
  // Does element support only full width or can be used within layouts
  // (e.g. 50/50 layout)
  forceFullWidth: true,
};

export const mocks = {
  displayContexts: [{ name: 'No selection', data: {} }],
};

const manifest: ElementManifest = {
  type,
  version: '1.0',
  name,
  ssr: false,
  initState,
  ui,
  mocks,
};

export default manifest;
export * from './interfaces';
