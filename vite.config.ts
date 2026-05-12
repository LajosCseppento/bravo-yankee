import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {plugins: ['@emotion/babel-plugin']},
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor';
          }
          if (id.includes('node_modules/@mui/')) {
            return 'mui';
          }
        },
      },
    },
  },
  define: {
    APP_PACKAGE_NAME: JSON.stringify(process.env.npm_package_name),
    APP_PACKAGE_VERSION: JSON.stringify(process.env.npm_package_version),
  },
});
