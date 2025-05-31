import {Grid, Stack, Typography} from "@mui/material";
import React, {memo} from "react";
import {AboutPageParagraph} from "../AboutPageParagraph";
import {PageHeader} from "../PageHeader";

import {croppedImageWithCurvedBorder} from "../../common/BorderStyling.ts";

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
                        Alcor is a coguar-dragon hybrid with telekinetic powers who lives in [REDACTED] City in the year 2601. At the dawn of the 27th century, climate change, geopolitical conflicts, and resource scarcity is no longer a problem. Most settlements offer high-tech amenities and ample greenspace, allowing everyone to find a place that fits their preferences. Methods of self-expression is readily available, with custom clothing and body modifications being a quick 3D-print or consultation away. While most places are peaceful and (relatively) uneventful places to live in, [REDACTED] City is filled with 'thrilling' experiences for people seeking a more exciting life.
                    </Typography>
                    <Typography variant={"body1"}>
                        The city's harbor and surrounding grasslands experience occasional kaiju attacks, attracting people with talents in combat or engineering. While the kaiju do not get close to the urban areas and stay clear of inhabited areas, the [REDACTED] City relies on valuable materials harvested by the kaiju, means that they are often hunted if they get within a certain distance of the city. The city is designed for parkour as elevated plazas dot the skyline, with semi-invisible pathways allowing easy traversal between them. The city also has plenty of elevators and invisible nets to catch people who are falling, so moving around the city is fairly accessible and safe. Because of the city's layout, people are very physically active, which allows people to be prepared for fighting and harvesting kaiju.
                    </Typography>
                    <AboutPageParagraph title={"Alcor's Life"}
                                        text={"Alcor plies his trade as an inventor, creating high tech gadgets and clothing for people interested in participating in physically active activities like defense, parkour, or brawling. He also participates in parkour in his spare time, and also moonlights as a part-time superhero who rescues people caught in the middle of kaiju attacks. Alcor tries to maintain a cool and powerful image, but his friends know that he's much more geeky and kind than he looks. However, they worry too much about his self-experimentation in the pursuit of becoming stronger, as he wants to make sure he's always prepared for any fights that break out."}/>
                </Stack>
                {/*TODO Add background images*/}
            </Grid>
        </Grid>
    </div>;
});