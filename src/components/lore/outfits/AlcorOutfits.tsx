import {PageHeader} from "../PageHeader";
import {Grid, Typography} from "@mui/material";
import {AboutPageParagraph} from "../AboutPageParagraph";
import {SkeletonImage} from "../../SkeletonImage";
import autumnal from "./autumnal.png"
import vernal from "./vernal.png"
import serotinal from "./serotinal.png"
import estival from "./estival.png"
import hibernal from "./hibernal.png"

export function AlcorOutfits() {
    // TODO Switch themes for different forms and outfits?
    return <Grid container spacing={2}>
        <Grid item>
            <PageHeader title={"Alcor's Wardrobe"}/>
            <Typography variant="body1">Alcor's primary outfits are loosely themed after the Modern mid-latitude ecological seasons. He prefers fairly tight and high-tech outfits, usually infused with high-tech fabrics and materials.
                Each outfit is designed to be worn in an athleisure context, but are sometimes also dedicated for other activities.</Typography>
            <SkeletonImage containerStyle={{marginTop: '8px'}} style={{width: '100%', display: 'block'}} src={"https://alcorsiteartbucket.s3.amazonaws.com/webp/outfit_sheet.webp"} aspectRatio={2.35}/>
        </Grid>
        <AboutPageParagraph title={'Vernal Outfit'}
                            text={"Alcor's Vernal themed outfit is primarily used for laboratory work. It consists of a black and teal jacket with neon blue accents, a zip up long-sleeved shirt that transitions into fingerless gloves, gray shorts, black leggigns, and sneakers. All of the clothes are custom designed to be workshop safe, and are designed to be resistant to minor accidents like cuts or chemical spills. The messenger bag in this outfit is for hand-delivering sensitive commissions to clients, which is paired with the compression leggings and energy return shoes to allow him to be active around the lab and around the city without getting tired on busy days. Finally, the outfit is rounded out with an AR visor that output helpful heads up displays, allowing him to keep track of tasks, messages, and reminders."}
                            img={vernal}
                            subsections={[{title: 'Substitutions', text: 'Bodysuit instead of shirt and leggings, labcoat instead of hoodie'}]}
                            colors={['#03151a', '#a8a0ac', '#47f1ff', '#efbb47', '#808d9d']}/>
        <AboutPageParagraph title={'Estival Outfit'}
                            text={"Alcor's Estival themed outfit is primarily for casual outings that blends traditional Japanese clothing with modern streetwear. It consists of a blue jinbei top, navy shorts, black checkered leggings, and geta sandals. The jinbei is modified to include a hood, which is helpful when it is raining, or when the sun is too intense. The shorts are made with a woven with a fabric that maximizes breathability, and the leggings do a great job with wicking away sweat. The geta sandals also helps keep Alcor's feet dry, which helps during periods of intense rain or heat during the hot Estival season."}
                            img={estival}
                            subsections={[{title: 'Substitutions', text: 'Sneakers instead of geta sandals, standard jinbei pants instead of shorts'}]}
                            colors={['#d8d5d8', '#0f1632', '#021bde', '#3c3e60', '#24294a']}/>
        <AboutPageParagraph
            text={"Alcor's Serotinal themed outfit is one of his most casual outfits. It consists of a cropped jacket, long sleeved shirt, capris length sweapants, and sneakers. The jacket and shirt have built in circuits, allowing for basic computation, which is then displayed on lightweight fabric displays. Usually, it is used to display decals based on the current weather, geometric decals on his jacket, and vitals on his shirt. The clothes are perfect for up to mid-intensity physical activities as they are highly breathable, providing comfort while running or walking outdoors during the warm Serotinal season."}
            title={'Serotinal Outfit'}
            img={serotinal}
            subsections={[{title: 'Substitutions', text: 'Leggings instead of socks, tank top and compression sleeves instead of long sleeved shirt'}]}
            colors={['#dad2db', '#010d19', '#7cc5e9', '#efc65a', '#f7f3f3']}/>
        <AboutPageParagraph title={'Autumnal Outfit'}
                            text={"Alcor's Autumnal themed outfit is techwear designed for archery during the Autumnal season. It's comprised of a white techwear hoodie with multiple drawstrings to adjust how loose or tight the hoodie should be, a black long-sleeved shirt with a thunderbolt graphic, gray sweatpants, black leggings, and green sneakers. The hoodie and joggers are designed to keep Alcor warm on cooler days, while having high tech materials to keep himself dry and regulate his comfort level. The shoes are designed to minimize noise so he can move around undetected. He also has a pair of noise cancelling green headphones, but can be set to amplify small noises to track smaller targets."}
                            img={autumnal}
                            subsections={[{title: 'Substitutions', text: 'Leggings are optional, gray joggers can be replaced with white shorts'}]}
                            colors={['#e3e1ea', '#578fac', '#8dde55', '#03141a', '#b5aab5']}/>
        <AboutPageParagraph
            text={"Alcor's Hibernal themed outfit is techwear specialized for parkour during the Hibernal season. It consists of an lightweight windbreaker jacket, an ultrawarm gilet, a thermally insulated compression bodysuit, flexible shorts, and impact dampening sneakers. This ensemble allows Alcor to jump from surface to surface easily, and painlessly fall from high distances. The bodysuit is made from a patented blend of Castor's exotic matter and other cutting edge polymers, that boasts self-repairing and healing properties, allowing for Alcor to shrug off minor cuts and bruises. The clothing also be toggled to glow in the dark and be reflective, allowing for Alcor to be easily spotted at night and also be able to stalk people and appear intimidating when necessary. The layers also help Alcor stay warm during the cold nights using his body heat with only light physical activity."}
            title={'Hibernal Outfit'}
            subsections={[{title: 'Substitutions', text: 'Jacket is optional, base layer gives off a teal light'}]}
            colors={['#fffef6', '#02151b', '#46bcec', '#fbc047', '#2a2d4a']}
            img={hibernal}/>
    </Grid>;
}