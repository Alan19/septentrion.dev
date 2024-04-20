import {PageHeader} from "../PageHeader";
import {Fade, Grid, Typography} from "@mui/material";
import {AboutPageParagraph} from "../AboutPageParagraph";

export function AlcorOutfits() {
    // TODO Switch themes for different forms and outfits?
    return <Fade in>
        <Grid container spacing={2}>
            <Grid item>
                <PageHeader title={"Alcor's Outfits"}/>
                <Typography variant="body1">Alcor's primary outfits are loosely based on the Modern mid-latitude ecological seasons. He prefers fairly tight and high-tech outfits, usually infused with high-tech fabrics and materials.
                    Each outfit is designed to be worn in an athleisure context, but are sometimes also dedicated for other activities.</Typography>
            </Grid>
            <AboutPageParagraph title={'Vernal Outfit'}
                                text={'Alcor\'s Vernal-themed outfit is primarily for laboratory work. The top comprises of a black sleeveless shirt that transitions into fingerless gloves. Layered on top is a hoodie that is adorned with his lab\'s logo, complimented by a messenger bag that is often used for delivering his products to his clients. This ensemble is completed with high-tech shorts and leggings, which reduces fatigue on busy days. Finally, a pair of custom-made lab safe sneakers round out the attire. Additionally, this outfit comes with a pair of AR goggles that shows helpful heads up displays that keep track of tasks and reminders.'}
                                img={'https://pbs.twimg.com/media/FWn7dJ9XkAIHM5j?format=jpg&name=medium'}
                                subsections={[{title: 'Substitutions', text: 'Bodysuit instead of shirt and leggings, labcoat instead of hoodie'}]}
                                colors={['#5B8EB6', '#7D95AF', '#BAC6D1', '#354E63', '#65F2F4', '#F1D178', '#205C6C']}/>
            <AboutPageParagraph title={'Estival Outfit'}
                                text={"Alcor's Estival themed outfit is primarily for casual outings that blends traditional Japanese clothing with modern streetwear. It's comprised of a blue jinbei paired with navy shorts adorned with his superhero alter-ego's emblem. Underneath the shorts are a pair of black leggings with a checkerboard pattern on one leg. Finally, he wears a pair of traditional geta sandals to help keep his feet cool and dry during the warm and wet summer season."}
                                img={'https://pbs.twimg.com/media/FVtImffaUAAGhEV?format=jpg&name=large'}
                                subsections={[{title: 'Substitutions', text: 'Sneakers instead of geta sandals, standard jinbei pants instead of shorts'}]}
                                colors={['#D6D8D7', '#31425C', '#4BABB9', '#6B5F6D', '#000000', '#FFFFFF']}/>
            <AboutPageParagraph title={'Autumnal Outfit'}
                                text={"Alcor's Autumnal themed outfit is techwear designed for archery during the Autumnal season. It's comprised of a white techwear hoodie with multiple drawstrings to adjust how loose or tight the hoodie should be, a black long-sleeved shirt with a thunderbolt graphic, gray sweatpants, black leggings, and green sneakers. The hoodie and joggers are designed to keep Alcor warm on cooler days, while having high tech materials to keep himself dry and regulate his comfort level. The shoes are designed to minimize noise so he can move around undetected. He also has a pair of noise cancelling green headphones, but can be set to amplify small noises to track smaller targets."}
                                img={'https://alcorsiteartbucket.s3.amazonaws.com/webp/rsn_sketch.webp'}
                                subsections={[{title: 'Substitutions', text: 'Leggings are optional, gray joggers can be replaced with white shorts'}]}
                                colors={['#D9E1EA', '#B9C1CF', '#578FAE', '#707073', '#9CDF3F', '#383A3B']}/>
        </Grid>
    </Fade>;
}