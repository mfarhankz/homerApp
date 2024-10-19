import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import plugin from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    build: {
      chunkSizeWarningLimit: 3000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          },
        },
        external: ['@azure/storage-blob'],
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3004,
  },
})
