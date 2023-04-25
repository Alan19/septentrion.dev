import React from "react";
import "./App.css";
import {Container, createTheme, ThemeProvider,} from "@mui/material";
import {blue} from "@mui/material/colors";
import {Gallery} from "./components/gallery/Gallery";
import {Main} from "./components/Main";
import {createHashRouter, RouterProvider} from "react-router-dom";

export const theme = createTheme({
    palette: {
        primary: {
            main: blue[500],
        },
    },
});

const router = createHashRouter([
    {
        path: "/",
        element: <Main />,
    },
    {
        path: "/gallery",
        element: <Gallery />
    }
]);

function App() {

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Container>
                    <RouterProvider router={router} />
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
