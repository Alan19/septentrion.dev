import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Website} from './App.tsx'
import {CssBaseline} from '@mui/material'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CssBaseline/>
        <Website/>
    </StrictMode>,
)
