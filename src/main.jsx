import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Game from './TicTacToe.jsx'
import App from './FilterableProduct.jsx'
import Stopwatch from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Stopwatch />
  </StrictMode>,
)
