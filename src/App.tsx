import React from "react";
import "./App.css";
import {ThemeProvider,} from "@mui/material";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {CssVarsProvider} from "@mui/material-next";
import {alcorTheme, websiteThemes} from "./Themes";
import {drawerColor, Navigation} from "./components/common/Navigation";
import {theme} from "./Theme.tsx";
import {useSettings} from "./UseSettings.ts";
import {AppRouter} from "./AppRouter.tsx";
import {NuqsAdapter} from "nuqs/adapters/react-router/v7";

export function App() {
    const {appTheme} = useSettings();

    return <CssVarsProvider theme={websiteThemes.find(value => value.name === appTheme)?.theme ?? alcorTheme}>
        <ThemeProvider theme={theme}>
            <NuqsAdapter>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="App" style={{
                        backgroundColor: drawerColor,
                        minHeight: "100vh",
                        color: 'var(--md-palette-text-primary)'
                    }}>
                        <Navigation>
                            <AppRouter/>
                        </Navigation>
                    </div>
                </LocalizationProvider>
            </NuqsAdapter>
        </ThemeProvider>
    </CssVarsProvider>;
}