import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'  <-- แนะนำให้ใส่ // ข้างหน้า หรือลบออกไปเลยครับ
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)