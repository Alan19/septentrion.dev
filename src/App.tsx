import React from "react";
import "./App.css";
import {createTheme, ThemeProvider,} from "@mui/material";
import {Gallery} from "./components/gallery/Gallery";
import {createHashRouter, RouterProvider} from "react-router-dom";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AlcorForms} from "./components/alcor-forms/AlcorForms";
import {blue, yellow} from "@mui/material/colors";
import {AquariusForm} from "./components/alcor-forms/AquariusForm";
import {MForm} from "./components/alcor-forms/MForm";
import {AICoreForm} from "./components/alcor-forms/AICoreForm";
import {JupiterForm} from "./components/alcor-forms/JupiterForm";
import {TriangulumForm} from "./components/alcor-forms/TriangulumForm";
import {SiteAppBar} from "./SiteAppBar";

export const theme = createTheme({
    palette: {
        primary: {
            main: blue[500],

        },
        secondary: {
            main: yellow['A400'],
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
                children: [
                    {
                        path: "/alcor_forms/aquarius",
                        element: <AquariusForm/>
                    },
                    {
                        path: "/alcor_forms/m",
                        element: <MForm/>
                    },
                    {
                        path: "/alcor_forms/aicore",
                        element: <AICoreForm/>
                    },
                    {
                        path: "/alcor_forms/jupiter",
                        element: <JupiterForm/>
                    },
                    {
                        path: "/alcor_forms/triangulum",
                        element: <TriangulumForm/>
                    }
                ]
            }
        ]
    }
]);

function App() {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <RouterProvider router={router}/>
                </div>
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
