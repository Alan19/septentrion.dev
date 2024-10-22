import {Fade, Grid, Stack, Typography} from "@mui/material";
import React, {memo} from "react";
import castor from "../assets/castor.webp"
import castorEvolution from '../assets/castor-evolved.webp'
import {AboutPageParagraph} from "../AboutPageParagraph";
import {PageHeader} from "../PageHeader";
import {SkeletonImage} from "../../SkeletonImage";
import {Divider} from "@mui/material-next";
import {croppedImageWithCurvedBorder} from "../characters/TemplatedLorePage";

export const AlcorWorldInfo = memo(function AlcorWorldInfo() {
    return <Fade in>
        <div>
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
                            body
                            modifications being a quick 3D-print or consultation away. While most places are peaceful and (relatively) uneventful places to live in, [REDACTED] City is filled with 'thrilling' experiences for people seeking a
                            less
                            peaceful lifestyle. The city's harbor and surrounding grasslands experience occasional kaiju attacks, making it a tempting destination for people who have talents in combat or engineering. The city is also has a
                            layout
                            and culture that helps train the parkour and fighting skills of the people who fight the kaiju, so there's plenty to do even when it's peaceful.
                        </Typography>
                        <AboutPageParagraph title={"Alcor's Life"}
                                            text={"Alcor plies his trade as an inventor, creating high tech gadgets and clothing for people interested in participating in physically active activities like defense, parkour, or brawling. He also participates in parkour in his spare time, and also moonlights as a part-time superhero who rescues people caught in the middle of kaiju attacks. Alcor tries to maintain a cool and powerful image, but his friends know that he's much more geeky and kind than he looks. However, they worry too much about his self-experimentation in the pursuit of becoming stronger, as he wants to make sure he's always prepared for any fights that break out."}/>
                        <Divider/>
                        <AboutPageParagraph title={"Castor"}
                                            text={"Castor is a symbiote that Alcor made by extracting alien DNA from a meteorite, which was then fused with his own DNA to increase the symbiote's compatibility with his own body. While he looks a bit scary and spooky, he's actually really helpful, and helps Alcor destress and unwind from work. Castor's body is made up of exotic matter, which powers a large chunk of Alcor's inventions with space warping and interfacing abilities. However, the generation rate of exotic matter is slow, so there is a long waitlist for commissions that use said material. On top of that, Alcor has his own personal projects he is working on, which makes the waitlist even longer."}
                                            img={<SkeletonImage src={castor} style={croppedImageWithCurvedBorder} aspectRatio={1615 / 2240}/>}
                                            colors={["#40A5B6", "#49FFE9", "#44D8CE", "#2D5C98"]}
                        />
                        <AboutPageParagraph title={"Castor β - Sentinel Mode"}
                                            text="When Alcor is incapacitated, Castor is able to seamlessly assume control of Alcor's body to defend him from further harm. This increases the percentage of exotic matter in Alcor's body, allowing Castor to mold Alcor's body into an evolved form personalized for Castor, dubbed Sentinel Mode. In Sentinel Mode, Castor tries his best to shield Alcor from further harm and heal his injuries as quickly as possible by focusing on crowd control, speed, and perception. Castor can also assume this form for short periods of time outside of combat, but with severly dimished combat abilites, so it is purely cosmetic."
                                            img={<SkeletonImage src={castorEvolution} style={croppedImageWithCurvedBorder} aspectRatio={1430 / 2272}/>}
                                            variant={"h6"}
                        />
                        {/*    TODO Move Castor stuff to his own webpage, and add world background images*/}
                    </Stack>

                </Grid>
            </Grid>
        </div>
    </Fade>;
});