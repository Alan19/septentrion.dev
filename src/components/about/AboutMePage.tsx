import {Divider, Grid, Typography} from "@mui/material";
import {PageHeader} from "../lore/PageHeader";
import {M3Pane} from "../common/M3Pane";

export function AboutMePage() {

    return (
        <M3Pane>
            <>
                <PageHeader title={"About Me (IRL)"}/>
                <Divider/>
                <Grid style={{marginTop: 0}} container spacing={2}>
                    <Grid item md={'auto'}>
                        <img src={"https://alcorsiteartbucket.s3.amazonaws.com/webp/moodboard.webp"} style={{width: '100%', objectFit: 'contain', maxHeight: '80vh'}}/>
                    </Grid>
                    <Grid item md>
                        <Typography><b>Name:</b> Alan</Typography>
                        <Typography><b>Country:</b> USA</Typography>
                        <Typography><b>Hobbies:</b> Gardening, Tabletop Roleplaying Games, TCGs, Video Games</Typography>
                        <br/>
                        <Typography>Hello, I'm Alan, a software engineer who lives in New York City! This is my website for posting my commissioned artworks and recording my thoughts on the lore of Alcor's world! I also use this as a way to
                            learn more about web development! I hope you have a nice time looking at the artwork and at my very amateurish lore writing! I also play Pokemon Go, Maplestory, Splatoon, and Pathfinder 2nd Edition in my spare
                            time.</Typography>
                    </Grid>
                </Grid>
            </>
        </M3Pane>
    );
}