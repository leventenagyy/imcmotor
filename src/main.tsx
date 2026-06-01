import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { CartProvider } from '@/lib/cart'
import App from './App'
import './index.css'

// Vite injects BASE_URL from `base` (set per environment in vite.config.ts).
// React Router wants no trailing slash; '/' stays '/'.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <MotionConfig reducedMotion="user">
        <CartProvider>
          <App />
        </CartProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
)
