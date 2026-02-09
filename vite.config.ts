import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Define 'process.env' as a regular object to support `process.env.KEY` usage
      'process.env': env,
      // Also define global 'process' just in case a library checks `process.version` or similar
      'process': {
        env: env
      }
    }
  };
});