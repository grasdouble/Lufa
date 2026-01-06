import esbuild from 'esbuild';
import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');
const packageRoot = fileURLToPath(new URL('.', import.meta.url));

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
  name: 'esbuild-problem-matcher',
  setup(build) {
    build.onStart(() => {
      console.log('[watch] build started');
    });
    build.onEnd((result) => {
      result.errors.forEach(({ text, location }) => {
        console.error(`✘ [ERROR] ${text}`);
        console.error(`    ${location.file}:${location.line}:${location.column}:`);
      });
      console.log('[watch] build finished');
    });
  },
};

const copyMaps = () => {
  const mapsDir = resolve(packageRoot, 'dist', 'maps');
  const maps = [
    {
      label: 'primitives',
      file: 'primitives.map.json',
      sources: [
        resolve(
          packageRoot,
          'node_modules',
          '@grasdouble',
          'lufa_design-system-primitives',
          'dist',
          'primitives.map.json'
        ),
        resolve(packageRoot, '..', '..', '..', 'design-system', 'primitives', 'dist', 'primitives.map.json'),
      ],
    },
    {
      label: 'tokens',
      file: 'tokens.map.json',
      sources: [
        resolve(
          packageRoot,
          'node_modules',
          '@grasdouble',
          'lufa_design-system-tokens',
          'dist',
          'tokens.map.json'
        ),
        resolve(packageRoot, '..', '..', '..', 'design-system', 'tokens', 'dist', 'tokens.map.json'),
      ],
    },
  ];

  for (const map of maps) {
    const source = map.sources.find((candidate) => existsSync(candidate));
    if (!source) {
      console.warn(`[maps] ${map.label} map not found; build the design-system package before packaging.`);
      continue;
    }

    const target = resolve(mapsDir, map.file);
    mkdirSync(dirname(target), { recursive: true });

    const shouldCopy = !existsSync(target) || statSync(source).mtimeMs > statSync(target).mtimeMs;
    if (shouldCopy) {
      copyFileSync(source, target);
      console.log(`[maps] Copied ${map.label} map -> ${target}`);
    }
  }
};

const copyMapsPlugin = {
  name: 'copy-lufa-maps',
  setup(build) {
    build.onEnd((result) => {
      if (result.errors.length > 0) return;
      copyMaps();
    });
  },
};

async function main() {
  const ctx = await esbuild.context({
    entryPoints: ['src/index.ts'],
    bundle: true,
    format: 'cjs',
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    platform: 'node',
    outfile: 'dist/extension.js',
    external: ['vscode'],
    logLevel: 'silent',
    plugins: [esbuildProblemMatcherPlugin, copyMapsPlugin],
  });

  if (watch) {
    console.log('[watch] Watching for changes...');
    await ctx.watch();
  } else {
    await ctx.rebuild();
    await ctx.dispose();
    console.log('✓ Build complete');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
