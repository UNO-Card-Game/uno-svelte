import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  build: {
    outDir: '/home/ubuntu/devops/site', // Output directory for build files
    emptyOutDir: true,
  },
  plugins: [svelte()],
  base: '/uno' 

});
