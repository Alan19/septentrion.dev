import {Grid, Typography} from "@mui/material";
import React from "react";
import {PageHeader} from "../PageHeader";
import {SkeletonImage} from "../../SkeletonImage";

export function BioEnhancementIntro() {
    return <>
        <PageHeader title={"Bio-Enhancement"}/>
        <Grid container direction={"row"} spacing={2}>
            <Grid item>
                <Typography variant={"body1"}>
                    Due to the conflicts that embroil [REDACTED] City, Alcor has a hidden bio-enhancement room in his laboratory where he experiments on himself to push himself to evolve into stronger or more versatile forms. While
                    Alcor cannot shapeshift naturally, he is able to infuse himself with Castor's exotic matter to tap into alternate realities and synthesize powerful vessels for him to upload his consciousness into, or to evolve
                    himself into a stronger form.
                </Typography>
            </Grid>
            <Grid item sm={4}>
                <SkeletonImage aspectRatio={2} style={{width: '100%'}} src={"https://alcorsiteartbucket.s3.amazonaws.com/webp/aquarius_vs_jupiter.webp"}/>
            </Grid>
            <Grid item sm={8}>
                <Typography variant={"body1"}>
                    <Typography variant={"h5"}>Simulated Transdimensional Replications of Identity Divergence Explorations (S.T.R.I.D.E.)</Typography>
                    The S.T.R.I.D.E. vessels synthesized by sampling from alternate universes where Alcor is of a different species. Since the created vessels not sentient, Alcor can upload his mind into those bodies. The bio-enhancement
                    lab also contains a small training space where he can practice using each of his other bodies' fighting styles. He currently has stabilized 2 of these vessels, codenamed Jupiter and Aquarius.
                </Typography>
            </Grid>
            <Grid item sm={4}>
                <SkeletonImage aspectRatio={2.4140893470790377} style={{width: '100%'}} src={"https://alcorsiteartbucket.s3.amazonaws.com/webp/alts/alcor_body_study_sketchpage_1.webp"}/>
            </Grid>
            <Grid item sm={8}>
                <Typography variant={"body1"}>
                    <Typography variant={"h5"}>Alcor's Power Classes</Typography>
                    Most of Alcor's forms can be divided into a series of power classes, which measure their power level. Each form can encompass a range of power classes, and he can adjust his current power tier in his current form for the
                    purposes of self expression for the task at hand. The power tiers in ascending order are Thuban, Rastaban, Eltanin, Altais, Tyl, and Aldhibah. Each of those power classes have certain energy and maintenance requirements.
                    Alcor's default power class is Rastaban class, so he can maintain Thuban and Rastaban class forms with next to no difficulty. Eltanin class forms are fairly easy to Alcor to maintain, with it's main requirement being a
                    higher energy intake, which is fairly easy to maintain by just eating. Tyl class forms are harder to use and maintain, with them having an even higher energy cost as maintenance, as well as expensive costs to activate
                    the form. Most of them are existing upgrades to one of his vessels, which means they cannot be deployed for immediate use. The existence of the Aldhibah class is not revealed to the public, with information about the
                    class stored in the most secure areas in Alcor's lab. Forms at that power class is created through mythical artifacts, and cannot be safely evolved into, which means that the bodies have to by synthesized and stored to
                    use it. Forms in that power class are deployed only in emergencies, and as a security measure, is overloaded with features that would require multiple consciousnesses linked to Alcor working in tandem to operate it at a
                    usable level.
                </Typography>
            </Grid>
            <Grid item sm={4}>
                <SkeletonImage style={{width: '100%'}} aspectRatio={0.8243310619910255} src={"https://alcorsiteartbucket.s3.amazonaws.com/webp/eclipse_deity_v3.webp"}/>
            </Grid>
            <Grid item sm={8}>
                <Typography variant={"h5"}>Evolutionary Infusions</Typography>
                <Typography>
                    While Alcor normally appears as a fairly well built and toned cougar-dragon hybrid, he used to be a bit smaller before creating Castor. Alcor first gained the ability to evolve into a stronger form after fusing with
                    Castor for the first time (although all his friends noted he could have just worked out a bit more), which resulted in him being infused with his first dose of exotic matter. This resulted in further experiments to
                    synthesize larger doses of exotic matter for Alcor to absorb, which was a wild success. This caused Alcor to evolve even further, although each of those forms do have tradeoffs, and needs a lot of energy to maintain, so
                    Alcor can't use them all the time. Eager to transcend these limitations, Alcor sought to infuse fragments of dormant gods into the exotic matter infusion. While this approach temporarily circumvented his evolutionary
                    plateau, the resulting transformations were difficult to effectively use as they tend to have a lot of new abilities and senses he's not used to, proving that science is not a perfect substitute for training.
                </Typography>
            </Grid>
        </Grid>
    </>;
}