import {Grid} from "@mui/material";
import {ButtonStack} from "./ButtonStack";
import React from "react";
import {Header} from "./Header";

export function Summary() {
  return <Grid container direction={"column"} spacing={3}>
    <Grid item>
      <Header/>
    </Grid>
    <Grid item>
      <Grid container>
        <Grid item xs={12} lg={5}>
          <ButtonStack/>
        </Grid>
      </Grid>
    </Grid>
  </Grid>;
}