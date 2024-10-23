import {Grid, Stack, Typography} from "@mui/material";
import React, {memo} from "react";
import {AboutPageParagraph} from "../AboutPageParagraph";
import {PageHeader} from "../PageHeader";
import {croppedImageWithCurvedBorder} from "../characters/TemplatedLorePage";

export const AlcorWorldInfo = memo(function AlcorWorldInfo() {
    return <div>
            <PageHeader title={"Alcor's World"}/>
            <Grid container spacing={2}>
                <Grid item xs={0} md={2}>
                    <img src={'https://alcorsiteartbucket.s3.amazonaws.com/webp/triangle_shot.webp'} style={croppedImageWithCurvedBorder}/>
                </Grid>
                <Grid item xs={12} md={10}>
                    <Stack spacing={'1rem'}>
                        <Typography variant={"body1"}>
                            Alcor is a coguar-dragon hybrid with telekinetic powers who lives in [REDACTED] City in the year 2601. At the dawn of the 27th century, climate change, geopolitical conflicts, and resource scarcity is no longer a
                            problem. Most settlements offer high-tech amenities and ample greenspace, allowing everyone to find a place that fits their preferences. Methods of self-expression is readily available, with custom clothing and
                            body modifications being a quick 3D-print or consultation away. While most places are peaceful and (relatively) uneventful places to live in, [REDACTED] City is filled with 'thrilling' experiences for people
                            seeking a more exciting and dynamic lifestyle.
                        </Typography>
                        <Typography variant={"body1"}>
                            The city's harbor and surrounding grasslands experience occasional kaiju attacks, making it a tempting destination for people who have talents in combat or engineering. The city is designed for parkour as most
                            outdoor areas are accessible for the public, with many semi-hidden rooftop plazas being hangout spots for friend groups. A mix of aerial taxi services combined with personal gravity dampeners are used by people
                            who can't physically reach those areas, allowing them to access those hard to reach spots. There's also plenty of training events, which allows people to stay active to prepare for kaiju attacks and to improve
                            their overall fitness.
                        </Typography>
                        <AboutPageParagraph title={"Alcor's Life"}
                                            text={"Alcor plies his trade as an inventor, creating high tech gadgets and clothing for people interested in participating in physically active activities like defense, parkour, or brawling. He also participates in parkour in his spare time, and also moonlights as a part-time superhero who rescues people caught in the middle of kaiju attacks. Alcor tries to maintain a cool and powerful image, but his friends know that he's much more geeky and kind than he looks. However, they worry too much about his self-experimentation in the pursuit of becoming stronger, as he wants to make sure he's always prepared for any fights that break out."}/>
                    </Stack>
                    {/*TODO Add background images*/}
                </Grid>
            </Grid>
    </div>;
});