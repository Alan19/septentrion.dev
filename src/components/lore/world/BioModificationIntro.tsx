import {Grid, Stack, Typography} from "@mui/material";

import {PageHeader} from "../PageHeader";
import {AboutPageParagraph} from "../AboutPageParagraph";
import aquariusSplashImage from "../assets/splash/aquarius-splash.webp"
import {croppedImageWithCurvedBorder} from "../../common/BorderStyling.ts";

export function BioModificationIntro() {
    return <>
        <PageHeader title={"Bio-Enhancement"}/>
        <Grid container direction={"row"} spacing={'1rem'}>
            <Grid item>
                <Stack spacing={1}>
                    <Typography variant={"body1"}>
                        Alcor is a shape design and modification enthusiast, which has gotten mainstream acceptance around the late 24th century. While it's trivial to modify one's morphology to include things like additional limbs and animalistic ears, Alcor decided to go with a less orthodox approach with how he organizes his morphological loadout, and by extension, his consciousness.
                    </Typography>
                    <AboutPageParagraph title={"Background"}
                                        variant={"h6"}
                                        text={"Alcor normally appears as a fairly athletic and toned cougar-dragon, but he used to be a lot less muscular before he created Castor. His current state is actually an evolved form that he gained after merging with Castor for the first time and got dosed with a significant amount of exotic matter (but everyone noted that it just looked like he worked out more and was totally achievable goal). This resulted in Alcor conducting more experiments to infuse himself with more exotic matter, which allowed him to develop a series of evolved forms and alternate forms. However, each of these forms require differing energy needs, so he's been cautious of overextending and biting off more than he can chew."}/>
                </Stack>
            </Grid>
            <Grid item md={2} sm={0}>
                <img src={aquariusSplashImage} style={{...croppedImageWithCurvedBorder}}/>
            </Grid>
            <Grid item md sm={12}>
                <Stack spacing={1}>
                    <AboutPageParagraph title={"Alternate Physiology Exploration eXercise"}
                                        text={"Alcor's consciousness has been modified to be a highly complex and fairly novel setup that can be summarized as a distributed consciousness. His main cougar-dragon body is the primary consciousness, but with several custom designed alternate bodies that his consciousness is loosely spread through. However, most of the time these alternate bodies are not used at the same time as his main body. However, their memories and subconsciousness are managed by a combination of Castor's exotic matter interfacing with the nervous system of each of the bodies through discreet cybernetics, and a complex AI mainframe that manages the handling of information between each body that functions as the 'source of truth'. This allows for Alcor's consciousness to be preserved in the case of a body's death as it would take for the mainframe as well as all of his alternate bodies to be destroyed for his consciousness to be actually destroyed. The AI's mainframe is located under Alcor's lab inside its physical avatar, an dragonic mech that serves as Alcor's last line of defense to be used in emergencies."}/>
                    <AboutPageParagraph title={"Evolutionary Infusions"}
                                        variant={"h6"}
                                        text={"Alcor's main and alternate bodies also have many ways to evolve into stronger forms for various use cases. Most of them involve merging with his symbiote, but the method of merging varies greatly, ranging from having it coat his body, merging with his cells, or forming into armor. Evolving causes an increase in the amount of power used, which means that they are generally used sparingly."}/>
                    <AboutPageParagraph title={"Power Classes"}
                                        variant={"h6"}
                                        text={"Most bodies in Alcor's world can be divided into a series of power classes, which measure their power level. Each form can encompass a range of power classes, and he can adjust his current power tier in his current form for the purposes of self expression for the task at hand. The power tiers in ascending order are Alpha Class, Beta Class, Gamma Class, Delta Class, and Epsilon Class. Each of those power classes have certain energy and maintenance requirements. Alcor's default power class is in the Beta class, which can be maintained with just standard nutrition. Higher power classes may require things like fuel tanks or need to be charged with energy to function."}/>
                </Stack>
            </Grid>
        </Grid>
    </>;
}