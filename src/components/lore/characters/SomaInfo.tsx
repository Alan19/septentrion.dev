import {PageHeader} from "../PageHeader";
import {Fade, Grid} from "@mui/material";

import {AboutPageParagraph} from "../AboutPageParagraph";

export function SomaInfo() {
    return (
        <Fade in>
            <Grid container spacing={2}>
                <Grid item>
                    <PageHeader title={'Soma Yeto'}/>
                </Grid>
                <AboutPageParagraph
                    text={"Soma is a character for a custom class-less TTRPG ruleset, but his aesthetic is most similar to that of a bard and a swashbuckler. At a young age, an accident caused his brain to upgraded to an artificial brain constructed from exotic materials from another world. Because of his brain replacement, his parents moved him from a traditional fantasy city to a space age rural community, where they are more equipped to handle his new condition if necessary. His upgraded brain allows him to better manage his mental state and also allows him to hack devices remotely. Shortly after his 19th birthday, while he was on a shopping trip in his old hometown, he got swept up in the initiation trials for the newly reopened Adventurer's Society. He passed, allowing him to be initiated as an adventurer, and then proceeded to set off with some others who took the trial with him on a journey to resolve festering complications in his homeland and beyond."}
                    title={'Synopsis'} img={'https://alcorsiteartbucket.s3.amazonaws.com/webp/soma_v3.webp'}/>
                <AboutPageParagraph
                    text={"Soma's primary weapon is a professionally made dueling sword. He also has a dart pistol loaded with various elemental and debilitating ammo that can help with crowd control and debuffing enemies. In more deadly situations, he also has a nano blade that can inflict heavy damage to highly durable enemies. He also has a suit of armor made out of hardlight that can suddenly materialize around his body, which is reminiscent of an anime transformation sequence."}
                    title={'Fighting Style'} img={'https://alcorsiteartbucket.s3.amazonaws.com/webp/soma_hardlight_armor.webp'}/>
                <AboutPageParagraph
                    text={"Before his journey began, Soma looked almost entirely human, lacking the wooden horn on his forehead, the flower in place of one eye, and the glowing hair. He couldn't float as if suspended in water. In his universe, elemental traits grow stronger with practice, and it took many trials for Soma's physical traits to transcend ordinary human physiology."}
                    title={'Elemental Growth'}
                    img={'https://alcorsiteartbucket.s3.amazonaws.com/webp/seasoned_adventurer_outfit.webp'}/>
            </Grid>
        </Fade>

    );
}