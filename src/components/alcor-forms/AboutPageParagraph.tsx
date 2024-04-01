import React from "react";
import {Grid, Typography} from "@mui/material";
import {ColorSquare} from "./ColorSquare";
import {Variant} from "@mui/material/styles/createTypography";
import {TypographyPropsVariantOverrides} from "@mui/material/Typography/Typography";
import {OverridableStringUnion} from "@mui/types";

export function AboutPageParagraph(props: { title: string, text: string, img?: string | React.JSX.Element, alt?: string, colors?: string[], variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides> }) {
    const {text, img, title, alt, colors, variant = 'h5'} = props;
    return <>
        <Grid item xs={12}>
            <Typography fontWeight={"bold"} variant={variant}>{title}</Typography>
        </Grid>
        {img && typeof img === "string" ? <Grid item sm={3}><img width={"100%"} src={img} alt={alt}/></Grid> : <Grid item sm={3}>{img}</Grid>}
        <Grid item sm>
            <Typography variant={"body1"}>
                {text}
            </Typography>
            {colors &&
                <>
                    <Typography style={{marginTop: 24, marginBottom: 8}} fontWeight={"bold"} color={"var(--md-sys-color-tertiary)"} variant={'subtitle1'}>Colors</Typography>
                    <Grid container style={{borderRadius: '5%'}} spacing={2}>
                        {colors.map(value => <Grid item>
                            <ColorSquare color={value} shape={"square"}/>
                        </Grid>)}
                    </Grid>
                </>
            }
        </Grid>
    </>;
}