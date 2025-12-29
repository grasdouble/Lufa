import pkgJson from '../../../../main/package.json' with { type: 'json' };
import { componentsLayer } from './layers/components.js';
import { primitivesLayer } from './layers/primitives.js';
import { tokensLayer } from './layers/tokens.js';

interface PackageJson {
  name: string;
  version: string;
  description?: string;
  license?: string;
}

const pkg = pkgJson as PackageJson;

export const designSystemInfo = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description || 'Lufa Design System React component library',
  license: pkg.license,
  layers: [primitivesLayer, tokensLayer, componentsLayer],
  componentCategories: ['Forms', 'Feedback', 'Overlay', 'Navigation', 'Display', 'Typography', 'Layout'],
  resources: {
    documentation: 'https://github.com/grasdouble/Lufa/tree/main/packages/design-system/documentation',
    primitives: 'https://github.com/grasdouble/Lufa/tree/main/packages/design-system/primitives',
    storybook: 'https://storybook.example.com',
    instructions:
      'https://github.com/grasdouble/Lufa/blob/main/.github/instructions/lufa-design-system.instructions.md',
  },
};
