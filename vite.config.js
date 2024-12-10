import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Lắng nghe trên tất cả các địa chỉ IP
    port: 5173,      // Bạn có thể đổi port nếu cần
    strictPort: true // Đảm bảo Vite không tự động đổi port
  }
})
