import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './App.tsx'
import {CssBaseline} from '@mui/material'
import {BrowserRouter} from 'react-router-dom'
import 'react-loading-skeleton/dist/skeleton.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CssBaseline/>
        <BrowserRouter basename={"/"}>
            <App/>
        </BrowserRouter>
    </StrictMode>,
)
