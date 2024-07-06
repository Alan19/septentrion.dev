import React, {createContext} from "react";
import "./App.css";
import {createTheme, ThemeProvider,} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {CssVarsProvider} from "@mui/material-next";
import {alcorTheme, AppTheme, websiteThemes} from "./Themes";
import {useLocalStorage} from "./UseLocalStorage";
import {router} from "./RouterPaths";

// TODO get rid of this
export const theme = createTheme({
    typography: {
        h5: {
            color: "var(--md-sys-color-primary)"
        },
        h6: {
            color: "var(--md-sys-color-secondary)"
        }
    },
    palette: {
        primary: {
            main: "#38608F",
            dark: "#A2C9FE"

        },
        secondary: {
            main: "#535F70",
            dark: "#BBC7DB"
        }
    }
});

// @ts-ignore
export const AppThemeContext: React.Context<[AppTheme, (value: (((prevState: (AppTheme)) => (AppTheme)) | AppTheme)) => void]> = createContext(undefined);

export function Website() {
    const [appTheme, setAppTheme] = useLocalStorage('Alcor', 'appTheme');

    return <CssVarsProvider theme={websiteThemes.find(value => value.name === appTheme)?.theme ?? alcorTheme}>
        <ThemeProvider theme={theme}>
            <AppThemeContext.Provider value={[appTheme, setAppTheme]}>
                <App/>
            </AppThemeContext.Provider>
        </ThemeProvider>
    </CssVarsProvider>;
}

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="App" style={{backgroundColor: 'var(--md-sys-color-surface)', minHeight: "100vh", color: 'var(--md-palette-text-primary)'}}>
                <RouterProvider router={router}/>
            </div>
        </LocalizationProvider>
    );
}

export default App;
