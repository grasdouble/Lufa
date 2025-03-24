import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import reactPlugin from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command, mode, isPreview }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the
    // `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '');

    const defaultDefine = {
        __APP_ENV__: JSON.stringify(env.APP_ENV),
    };

    const defaultPlugin = [reactPlugin()];

    const getServeConfig = () => {
        return {
            // dev specific config
            plugins: [...defaultPlugin],
            define: {
                ...defaultDefine,
            },
        };
    };

    const getPreviewConfig = () => {
        return {
            // preview specific config
            plugins: [...defaultPlugin],
            define: {
                ...defaultDefine,
            },
        };
    };

    const getBuildConfig = () => {
        return {
            // build specific config
            plugins: [
                ...defaultPlugin,
                tailwindcss(),
                dts({
                    entryRoot: 'src',
                    tsconfigPath: './tsconfig.build.json',
                    rollupTypes: false,
                    outDir: 'dist',
                    exclude: ['**/*.test.*'],
                }),
                externalizeDeps({
                    deps: false,
                    devDeps: false,
                    except: [],
                    nodeBuiltins: false,
                    optionalDeps: false,
                    peerDeps: true,
                }),
            ],
            define: {
                ...defaultDefine,
            },
            build: {
                target: 'modules',
                minify: false,
                sourcemap: true,
                declaration: true,
                cssMinify: false,
                outDir: 'dist',
                // assetsInlineLimit: isProduction ? 4096 : 0,
                lib: {
                    formats: ['es'],
                    entry: resolve(__dirname, 'src/index.ts'),
                    name: 'LufaDS',
                    cssFileName: 'style',
                    fileName: (format: string) => {
                        let output = 'lufa-ui';
                        if (format === 'es') {
                            output += '.mjs';
                        } else if (format === 'umd') {
                            output += '.umd.cjs';
                        } else {
                            throw new Error('format not managed');
                        }
                        return output;
                    },
                },
            },
        };
    };

    if (command === 'serve') {
        return getServeConfig();
    } else if (isPreview) {
        return getPreviewConfig();
    } else if (command === 'build') {
        return getBuildConfig();
    } else {
        // Oops something wrong should happen
        return {};
    }
});
