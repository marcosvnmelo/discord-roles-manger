import adonis from '@91codes/adonis-vite/build/plugins/adonis';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) =>
  defineConfig({
    plugins: [react(), adonis({ input: 'resources/frontend/app.tsx' })],
    define: {
      'process.env': { ...process.env, ...loadEnv(mode, process.cwd()) },
    },
    resolve: {
      alias: {
        resources: path.resolve(__dirname, 'resources'),
      },
    },
    optimizeDeps: {
      include: ['flowbite'],
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'resources/frontend/app.tsx'),
        },
      },
      commonjsOptions: {
        defaultIsModuleExports(id) {
          try {
            const module = require(id);
            if (module?.default) {
              return false;
            }
            return 'auto';
          } catch (error) {
            return 'auto';
          }
        },
        transformMixedEsModules: true,
      },
    },
  });
