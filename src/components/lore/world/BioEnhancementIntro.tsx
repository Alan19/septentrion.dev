import {Grid, Stack, Typography} from "@mui/material";
import React from "react";
import {PageHeader} from "../PageHeader";
import {AboutPageParagraph} from "../AboutPageParagraph";
import {croppedImageWithCurvedBorder} from "../characters/TemplatedLorePage";
import aquariusSplashImage from "../assets/splash/aquarius-splash.webp"

export function BioEnhancementIntro() {
    return <>
        <PageHeader title={"Bio-Enhancement"}/>
        <Grid container direction={"row"} spacing={'1rem'}>
            <Grid item>
                <Stack spacing={1}>
                    <Typography variant={"body1"}>
                        Alcor is a avid participant in the self-modification scene, which has been made available for mainstream use in the 27th century. While it's easy to modify your own body cosmetically, with functional modifications
                        being
                        possible to a more limited extent, Alcor decided to go with a less orthodox approach with how he organizes his morphological loadout, and by extension, his consciousness.
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
                                        text={"Alcor's consciousness has been modified to be a highly complex and fairly novel setup, that on the surface appears to be a distributed consciousness. His main cougar-dragon body is the primary consciousness, but with several alternate bodies synthesized from simulations of alternate universes that his consciousness also inhabits. Under the hood, the memory syncing and the subconscious is managed by a combination of Castor's exotic matter bonding with the nervous system of each of the bodies, and a complex AI that manages the handling of information between each body that functions as the 'source of truth'. The AI's mainframe is located under Alcor's lab inside its physical avatar, an artificial recreation of a dragon god that serves as Alcor's last line of defense to be used in emergencies. Most of these alternate bodies are not active at the same time, and they are not telepathically linked. However, they do share a subconscious, allowing them to intuitively sense each other's mental states and therefore work well with each other. These consciousnesses also can sync their memories at any time, but real time syncing taxes the AI's resources, which are also needed for the lab's automation and servers."}/>
                    <AboutPageParagraph title={"Evolutionary Infusions"}
                                        variant={"h6"}
                                        text={"Alcor's main and alternate bodies also have many ways to evolve into stronger forms for various use cases. Most of them involve merging with his symbiote, but the method of merging varies greatly, ranging from having it coat his body, merging with his cells, or forming into armor. Evolving causes an increase in the amount of power used, which means that they are generally used sparingly."}/>
                    <AboutPageParagraph title={"Power Classes"}
                                        variant={"h6"}
                                        text={"Most of Alcor's forms can be divided into a series of power classes, which measure their power level. Each form can encompass a range of power classes, and he can adjust his current power tier in his current form for the purposes of self expression for the task at hand. The power tiers in ascending order are Thuban, Rastaban, Eltanin, Altais, Tyl, and Aldhibah. Each of those power classes have certain energy and maintenance requirements. Alcor's default power class is Rastaban class, so he can maintain Thuban and Rastaban class forms with next to no difficulty. Eltanin class forms are fairly easy to Alcor to maintain, with it's main requirement being a higher energy intake, which is fairly easy to maintain by just eating. Tyl class forms are harder to use and maintain, with them having an even higher energy cost as maintenance, as well as expensive costs to activate the form. Most of them are existing upgrades to one of his vessels, which means they cannot be deployed for immediate use. The existence of the Aldhibah class is not revealed to the public, with information about the class stored in the most secure areas in Alcor's lab. Forms at that power class is created through mythical artifacts, and cannot be safely evolved into, which means that the bodies have to by synthesized and stored to use it. Forms in that power class are deployed only in emergencies, and as a security measure, is overloaded with features that would require multiple consciousnesses linked to Alcor working in tandem to operate it at a usable level."}/>
                </Stack>
            </Grid>
        </Grid>
    </>;
}