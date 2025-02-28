import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './App.tsx'
import {CssBaseline} from '@mui/material'
import {HashRouter} from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CssBaseline/>
        <HashRouter>
            <App/>
        </HashRouter>
    </StrictMode>,
)
