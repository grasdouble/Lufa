import { cpSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

const __dirname = dirname(fileURLToPath(import.meta.url));

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

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

async function main() {
  const ctx = await esbuild.context({
    entryPoints: ['src/extension.ts'],
    bundle: true,
    format: 'cjs',
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    platform: 'node',
    outfile: 'dist/extension.js',
    external: ['vscode'],
    logLevel: 'silent',
    plugins: [esbuildProblemMatcherPlugin],
  });

  // Copy color map JSON files to dist (needed for both watch and build)
  console.log('Copying color map files...');

  // Prefer built packages, fallback to default files in src/
  const primitivesBuiltPath = join(
    __dirname,
    '..',
    '..',
    '..',
    'design-system',
    'primitives',
    'dist',
    'primitives-colors.map.json'
  );
  const primitivesDefaultPath = join(__dirname, 'src', 'default-primitives-colors.map.json');
  const primitivesMapPath = existsSync(primitivesBuiltPath) ? primitivesBuiltPath : primitivesDefaultPath;

  const tokensBuiltPath = join(
    __dirname,
    '..',
    '..',
    '..',
    'design-system',
    'tokens',
    'dist',
    'tokens-colors.map.json'
  );
  const tokensDefaultPath = join(__dirname, 'src', 'default-tokens-colors.map.json');
  const tokensMapPath = existsSync(tokensBuiltPath) ? tokensBuiltPath : tokensDefaultPath;

  if (!existsSync(primitivesMapPath)) {
    console.warn(
      '⚠️  Primitives color map not found. Run: pnpm --filter @grasdouble/lufa_design-system-primitives build'
    );
    console.warn('    Or run: ./scripts/copy-color-maps.sh to update default files');
  } else {
    cpSync(primitivesMapPath, join(__dirname, 'dist', 'default-primitives-colors.map.json'));
    console.log(
      `✓ Copied primitives map from: ${primitivesMapPath === primitivesBuiltPath ? 'built package' : 'default file'}`
    );
  }

  if (!existsSync(tokensMapPath)) {
    console.warn('⚠️  Tokens color map not found. Run: pnpm --filter @grasdouble/lufa_design-system-tokens build');
    console.warn('    Or run: ./scripts/copy-color-maps.sh to update default files');
  } else {
    cpSync(tokensMapPath, join(__dirname, 'dist', 'default-tokens-colors.map.json'));
    console.log(`✓ Copied tokens map from: ${tokensMapPath === tokensBuiltPath ? 'built package' : 'default file'}`);
  }

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
