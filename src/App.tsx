import React from "react";
import "./App.css";
import {Container, createTheme, ThemeProvider,} from "@mui/material";
import {Gallery} from "./components/gallery/Gallery";
import {Main} from "./components/Main";
import {createHashRouter, RouterProvider} from "react-router-dom";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AlcorForms} from "./components/alcor-forms/AlcorForms";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#d1e4ff',

        },
        secondary: {
            main: '#ffe07d',
        }
    }
});

const router = createHashRouter([
    {
        path: "/",
        element: <Main/>,
    },
    {
        path: "/gallery",
        element: <Gallery/>
    },
    {
        path: "/alcor_forms",
        element: <AlcorForms/>
    }
]);

function App() {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    {/*<SiteAppBar />*/}
                    <Container>
                        <RouterProvider router={router}/>
                    </Container>
                </div>
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
