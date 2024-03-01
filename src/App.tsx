import React from "react";
import "./App.css";
import {createTheme, ThemeProvider,} from "@mui/material";
import {Gallery} from "./components/gallery/Gallery";
import {createHashRouter, RouterProvider} from "react-router-dom";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AlcorForms} from "./components/alcor-forms/AlcorForms";
import {SiteAppBar} from "./SiteAppBar";
import {CssVarsProvider} from "@mui/material-next";
import alcorForms from './components/alcor-forms/form-icons/alcor_forms.json'
import {FormPage} from "./components/alcor-forms/FormPage";
import {castorTheme} from "./Themes";

export const theme = createTheme({
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

const router = createHashRouter([
    {
        path: '/',
        element: <SiteAppBar/>,
        children: [
            {
                path: "/gallery",
                element: <Gallery/>
            },
            {
                path: "alcor_forms",
                element: <AlcorForms/>,
            },
            ...alcorForms.map(value => {
                return {
                    path: `alcor_forms/${value.link}`,
                    element: <FormPage formInformation={value}/>
                }
            })
        ]
    }
]);

export const materialYouTheme = castorTheme;
function App() {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssVarsProvider theme={materialYouTheme}>
                <ThemeProvider theme={theme}>
                    <div className="App"
                         style={{backgroundColor: materialYouTheme.sys.color.surface, minHeight: "100vh"}}>
                        <RouterProvider router={router}/>
                    </div>
                </ThemeProvider>
            </CssVarsProvider>
        </LocalizationProvider>
    );
}

export default App;
