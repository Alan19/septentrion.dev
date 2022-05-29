import React from "react";
import "./App.css";
import {Container, createTheme, Grid, ThemeProvider, useMediaQuery,} from "@mui/material";
import {blue} from "@mui/material/colors";
import {CharacterImageGrid} from "./components/CharacterImageGrid";
import {Summary} from "./components/Summary";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Container>
            <Grid
                alignItems={"center"}
                container
                spacing={5}
                style={{minHeight: "100vh"}}
                direction={
                  useMediaQuery(theme.breakpoints.up("sm")) ? "row" : "column-reverse"
                }
                justifyContent={"center"}
            >
              <Grid item lg={"auto"} md={"auto"} sm={5}>
                <Summary/>
              </Grid>
              <Grid item lg md sm>
                <CharacterImageGrid/>
              </Grid>
            </Grid>
          </Container>
        </div>
      </ThemeProvider>
  );
}

export default App;
