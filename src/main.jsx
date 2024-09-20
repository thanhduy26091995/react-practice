import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Square from './TicTacToe.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Square />
  </StrictMode>,
)
