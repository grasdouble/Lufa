import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        react(),
        cssInjectedByJsPlugin(),
        tailwindcss(),
        externalizeDeps({
            deps: true,
            devDeps: false,
            optionalDeps: false,
            peerDeps: false,
            except: ['clsx'],
            nodeBuiltins: true,
        }),
    ],
    define: {
        'process.env.NODE_ENV': JSON.stringify('dev'),
        'process.env': {},
    },
    build: {
        minify: false,
        assetsDir: 'assets',
        lib: {
            assetsDir: 'assets',
            formats: ['es'],
            entry: {
                index: 'src/parcel.jsx',
            },
            fileName: () => 'home.mjs',
            preserveEntrySignatures: 'strict',
        },
        sourcemap: true,
    },
    server: {
        port: 4101,
        hmr: true,
    },
    preview: {
        port: 4101,
    },
});
