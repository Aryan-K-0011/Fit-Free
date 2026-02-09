import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Polyfill process.env for existing code compatibility
      // We JSON.stringify the env object so it becomes an object literal in the code
      'process.env': JSON.stringify(env)
    }
  };
});