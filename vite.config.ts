// eslint-disable-next-line node/no-unpublished-import
import react from '@vitejs/plugin-react';
// eslint-disable-next-line node/no-unpublished-import
import {defineConfig, splitVendorChunkPlugin} from 'vite';
// eslint-disable-next-line node/no-unpublished-import
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
