import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'


let env = loadEnv("development", process.cwd(), "VITE")
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: env.VITE_IP_FRONTEND,
    port: env.VITE_PORT_FRONTEND,
  },
  
})
