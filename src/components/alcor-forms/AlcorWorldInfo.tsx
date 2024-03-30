import {Fade, Grid, Typography} from "@mui/material";
import {getPageHeader} from "./AboutPage";

export function AlcorWorldInfo() {
    return <Fade in>
        <div>
            {getPageHeader("Alcor's World")}
            <Grid container direction={"column"} spacing={1}>
                <Grid item>
                    <Typography variant={"body1"}>
                        Alcor is a coguar-dragon hybrid with telekinetic powers who lives in [REDACTED] City in the year 2601. In this time period, the world has solved most of its problems, and most settlements effortlessly combine
                        high-tech amenities with abundant natural landscapes. While this means that most places are peaceful and wonderful places to live [REDACTED] City offers thrilling adventures for risk-takers who want to hone their
                        fighting skills. The city experiences sporadic kaiju attacks, has an active underground street brawling culture, and has a highly traversable layout for parkour enthusiasts.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant={"h6"}>Alcor's City Life</Typography>
                    <Typography variant={"body1"}>
                        Alcor plies his trade as an inventor, creating high-tech gadgets and clothing for people who are interested in active activities. He also participates in parkour in his spare time, and also moonlights as a part-time
                        superhero who rescues people caught in the middle of kaiju attacks while sometimes fighting them. Alcor tries his best to look cool and tough to his clients, but his friends and regulars know that he's much more
                        geeky and kind than he looks. However, they worry too much about his self-experimentation in the pursuit of becoming stronger, as he wants to make sure he's always prepared for any fights that break out.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant={"h6"}>Castor, a Symbiotic Companion from Space</Typography>
                    <Typography variant={"body1"}>
                        Castor is a symbiote that Alcor made by extracting alien DNA from a meteorite, and then fused with his own organic material to increase the symbiote's compatibility with his own body. While he looks a bit scary and
                        spooky, he's actually really helpful, and helps Alcor destress and unwind from work. Castor's body is made up of exotic matter, which powers a large chunk of Alcor's inventions. This means that while Alcor can
                        fabricate a lot of interesting gadgets, there's a giant waitlist for his commissions. On top of that, Alcor has his own personal projects he is working on, while collaborating he has with other inventors and
                        superheroes in the city, making his waitlist even longer.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    </Fade>
}