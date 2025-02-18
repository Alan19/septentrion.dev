import {Container, Divider, Grid2 as Grid, Typography} from "@mui/material";
import {PageHeader} from "../lore/PageHeader";
import {M3Pane} from "../common/M3Pane";
import {croppedImageWithCurvedBorder} from "../lore/characters/TemplatedLorePage.tsx";

export function AboutMePage() {
    // TODO Add more text
    return (
        <M3Pane>
            <Container>
                <PageHeader title={"About Me (IRL)"}/>
                <Divider/>
                <Grid style={{marginTop: 16}} container spacing={3}>
                    <Grid size={{md: 'auto'}}>
                        <img src={"https://alcorsiteartbucket.s3.amazonaws.com/webp/moodboard.webp"} style={{width: '100%', objectFit: 'contain', maxHeight: '80vh'}}/>
                    </Grid>
                    <Grid size={{md: 'grow'}} style={{...croppedImageWithCurvedBorder, padding: 16}}>
                        <Typography><b>Name:</b> Alan</Typography>
                        <Typography><b>Country:</b> USA</Typography>
                        <Typography><b>Hobbies:</b> Gardening, Tabletop Roleplaying Games, TCGs, Video Games</Typography>
                        <br/>
                        <Typography>Hello, I'm Alan, a software engineer who lives in New York City! This is my website for posting my commissioned artworks and recording my thoughts on the lore of Alcor's world! I also use this as a way to
                            learn more about web development! I hope you have a nice time looking at the artwork and at my very amateurish lore writing! I also play Pokemon Go, Maplestory, Splatoon, and Pathfinder 2nd Edition in my spare
                            time.</Typography>
                    </Grid>
                </Grid>
            </Container>
        </M3Pane>
    );
}