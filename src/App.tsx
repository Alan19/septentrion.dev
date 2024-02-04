import React from "react";
import "./App.css";
import {createTheme, ThemeProvider,} from "@mui/material";
import {Gallery} from "./components/gallery/Gallery";
import {createHashRouter, RouterProvider} from "react-router-dom";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AlcorForms} from "./components/alcor-forms/AlcorForms";
import {SiteAppBar} from "./SiteAppBar";
import {CssVarsProvider, extendTheme} from "@mui/material-next";
import alcorForms from './components/alcor-forms/form-icons/alcor_forms.json'
import {FormPage} from "./components/alcor-forms/FormPage";

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

const materialYouTheme = extendTheme({
    ref: {
        palette: {
            "primary": {
                "0": "#000000",
                "10": "#001C37",
                "20": "#00325A",
                "30": "#004880",
                "40": "#22619E",
                "50": "#417AB8",
                "60": "#5D94D4",
                "70": "#78AEF0",
                "80": "#A1C9FF",
                "90": "#D2E4FF",
                "95": "#EAF1FF",
                "99": "#FDFCFF",
                "100": "#FFFFFF"
            },
            "secondary": {
                "0": "#000000",
                "10": "#121C29",
                "20": "#27313F",
                "30": "#3D4756",
                "40": "#555F6F",
                "50": "#6D7888",
                "60": "#8791A2",
                "70": "#A1ACBD",
                "80": "#BCC7D9",
                "90": "#D8E3F6",
                "95": "#EAF1FF",
                "99": "#FDFCFF",
                "100": "#FFFFFF"
            },
            "tertiary": {
                "0": "#000000",
                "10": "#25152F",
                "20": "#3B2A45",
                "30": "#52405D",
                "40": "#6B5775",
                "50": "#84708F",
                "60": "#9F89AA",
                "70": "#BAA3C5",
                "80": "#D7BEE1",
                "90": "#F3DAFE",
                "95": "#FCECFF",
                "99": "#FFFBFF",
                "100": "#FFFFFF"
            },
            "neutralVariant": {
                "0": "#000000",
                "10": "#181C22",
                "20": "#2D3137",
                "30": "#43474D",
                "40": "#5B5E65",
                "50": "#74777E",
                "60": "#8D9198",
                "70": "#A8ABB3",
                "80": "#C3C6CE",
                "90": "#E0E2EA",
                "95": "#EEF1F9",
                "99": "#FDFCFF",
                "100": "#FFFFFF"
            }
        }
    },
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

function App() {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssVarsProvider theme={materialYouTheme}>
                <ThemeProvider theme={theme}>
                    <div className="App">
                        <RouterProvider router={router}/>
                    </div>
                </ThemeProvider>
            </CssVarsProvider>
        </LocalizationProvider>
    );
}

export default App;
