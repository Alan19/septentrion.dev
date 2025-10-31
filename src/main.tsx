import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "beercss";
import "material-dynamic-colors";
import '@fontsource-variable/inter'
import '@fontsource/monomaniac-one';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
