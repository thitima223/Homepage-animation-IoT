  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react-swc'

  // https://vite.dev/config/
  export default defineConfig({
    plugins: [react()],
    build: {
      outDir: 'backend/dist',
    },
    server: {
      proxy: {
        '/api': {
          // target: 'http://localhost:7300',
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
        '/professors': {
          // target: 'http://localhost:7300',
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
        '/staff': {
          // target: 'http://localhost:7300',
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
        '/uploads': {
          // target: 'http://localhost:7300',
          target: 'http://localhost:3001',
          changeOrigin: true,
        }
      }
    }
  })
