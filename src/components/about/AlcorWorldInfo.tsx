import {Fade, Grid, Typography} from "@mui/material";
import React, {memo} from "react";
import castor from "./about-resources/castor.png"
import superheroArtwork from './about-resources/superhero-artwork.png'
import castorEvolution from './about-resources/castor-evolved.png'
import {AboutPageParagraph} from "./AboutPageParagraph";
import {PageHeader} from "./PageHeader";
import {SkeletonImage} from "../SkeletonImage";

export const AlcorWorldInfo = memo(function AlcorWorldInfo() {
    return <Fade in>
        <div>
            <PageHeader title={"Alcor's World"}/>
            <Grid container direction={"row"} spacing={2}>
                <Grid item>
                    <Typography variant={"body1"}>
                        Alcor is a coguar-dragon hybrid with telekinetic powers who lives in [REDACTED] City in the year 2601. In this time period, the world has solved most of its problems, and most settlements effortlessly combine
                        high-tech amenities with abundant natural landscapes. While this means that most places are peaceful and wonderful places to live, [REDACTED] City offers thrilling adventures for risk-takers who want to hone their
                        fighting skills. The city experiences sporadic kaiju attacks, has an active underground street brawling culture, and has a highly traversable layout for parkour enthusiasts.
                    </Typography>
                </Grid>
                <AboutPageParagraph title={"Alcor's Life"}
                                    text={"Alcor plies his trade as an inventor, creating high-tech gadgets and clothing for people who are interested in active activities. He also participates in parkour in his spare time, and also moonlights as a part-time" + " superhero who rescues people caught in the middle of kaiju attacks while sometimes fighting them. Alcor tries his best to look cool and tough to his clients, but his friends and regulars know that he's much more" + " geeky and kind than he looks. However, they worry too much about his self-experimentation in the pursuit of becoming stronger, as he wants to make sure he's always prepared for any fights that break out."}
                                    img={<SkeletonImage src={superheroArtwork} style={{width: '100%'}} aspectRatio={3782 / 3981}/>}
                                    colors={["#6B95C1", "#64CCF2", "#DFD9C3", "#DDE0D1"]}/>
                <AboutPageParagraph title={"Castor - Symbiotic Companion"}
                                    text={"Castor is a symbiote that Alcor made by extracting alien DNA from a meteorite, and then fused with his own organic material to increase the symbiote's compatibility with his own body. While he looks a bit scary and spooky, he's actually really helpful, and helps Alcor destress and unwind from work. Castor's body is made up of exotic matter, which powers a large chunk of Alcor's inventions. This means that while Alcor can fabricate a lot of interesting gadgets, there's a giant waitlist for his commissions. On top of that, Alcor has his own personal projects he is working on, while collaborating he has with other inventors and superheroes in the city, making his waitlist even longer."}
                                    img={<SkeletonImage src={castor} style={{width: '100%'}} aspectRatio={1615 / 2240}/>}
                                    colors={["#40A5B6", "#49FFE9", "#44D8CE", "#2D5C98"]}
                />
                <AboutPageParagraph title={"Castor β - Sentinel Mode"}
                                    text="When Alcor is incapacitated, Castor is able to seamlessly assume control of Alcor's body to defend him from further harm. This increases the percentage of exotic matter in Alcor's body, allowing Castor to mold Alcor's body into an evolved form personalized for Castor, dubbed Sentinel Mode. In Sentinel Mode, Castor is able to fire globs of exotic matter that quickly binds hostile entities on contact. In addition, his sensory abilities are enhanced, allowing for better detection of potential threats. Castor can also assume this form for short periods of time outside of combat, but without any of the defensive capabilities. This limitation leaves Castor disheartened, as he yearns for liberation from his role as the lab's mascot, aspiring instead for him permanently having his imposing physical form."
                                    img={<SkeletonImage src={castorEvolution} style={{width: '100%'}} aspectRatio={1430 / 2272}/>}
                                    variant={"h6"}
                />
            </Grid>
        </div>
    </Fade>;
});