import react from '@vitejs/plugin-react';
import {defineConfig, splitVendorChunkPlugin} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {plugins: ['@emotion/babel-plugin']},
    }),
    tsconfigPaths(),
    splitVendorChunkPlugin(),
  ],
  define: {
    APP_PACKAGE_NAME: JSON.stringify(process.env.npm_package_name),
    APP_PACKAGE_VERSION: JSON.stringify(process.env.npm_package_version),
  },
});
