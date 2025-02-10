import {Grid, Typography} from "@mui/material";
import {ColorSquare} from "./ColorSquare";
import {Variant} from "@mui/material/styles/createTypography";
import {TypographyPropsVariantOverrides} from "@mui/material/Typography/Typography";
import {OverridableStringUnion} from "@mui/types";

export function AboutPageParagraph(props: {
    alt?: string,
    colors?: string[],
    img?: string | React.JSX.Element,
    title: string,
    text: string,
    variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>,
    subsections?: { title: string, text: string }[]
}) {
    const {text, img, title, alt = '', colors, variant = 'h5', subsections = []} = props;

    function getImageElement() {
        if (img !== undefined) {
            if (typeof img === "string") {
                return <Grid item md={2}><img width={"100%"} src={img} alt={alt}/></Grid>;
            } else {
                return <Grid item md={2}>{img}</Grid>;
            }
        }
    }

    return <div>
        <Grid container spacing={'1rem'}>
            {getImageElement()}
            <Grid item sm={img ? 10 : 12}>
                <Typography fontWeight={"bold"} variant={variant}>{title}</Typography>
                <Typography variant={"body1"}>
                    {text}
                </Typography>
                {subsections.map(value => <>
                    <Typography style={{marginTop: 24}} fontWeight={"bold"} color={"var(--md-sys-color-tertiary)"} variant={'subtitle1'}>{value.title}</Typography>
                    <Typography variant={"body1"}>{value.text}</Typography>
                </>)}
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
        </Grid>
    </div>;
}