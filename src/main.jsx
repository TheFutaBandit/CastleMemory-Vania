import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainLogo from './components/logo.jsx'
import Backdrop from './components/Backdrop.jsx'
import Instruction from './components/Instruction.jsx'
import GameContainer from './components/GameContainer.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Backdrop />
    <MainLogo />
    <Instruction />
    <GameContainer />
  </StrictMode>,
)

/* Logo */




