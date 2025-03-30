import {PageHeader} from "../PageHeader";

import {Container, Divider, Grid, Stack, Typography} from "@mui/material";
import aicore from '../assets/badges/Character_Badge_-page008.webp'
import aquarius from '../assets/badges/Character_Badge_-page007.webp'
import castor from '../assets/badges/Character_Badge_-page006.webp'
import soma from '../assets/badges/Character_Badge_-page005.webp'
import jupiter from '../assets/badges/Character_Badge_-page003.webp'
import poslani from '../assets/badges/Character_Badge_-page010.webp'
import eclipse from '../assets/badges/Character_Badge_-page009.webp'
import triangulum from '../assets/badges/Character_Badge_-page011.webp'
import alcor from '../assets/badges/Character_Badge_-page001.webp'
import wilton from '../assets/badges/Character_Badge_-page004.webp'
import gemini from '../assets/badges/Character_Badge_-page012.webp'
import {Link} from "react-router-dom";
import {M3Pane} from "../../common/M3Pane.tsx";
import {SkeletonImage} from "../../SkeletonImage.tsx";
import {useDocumentTitle} from "usehooks-ts";

type CharacterLink = { image: string; linkPath?: string };

export function CharactersPage() {
    useDocumentTitle("Alcor Lore");

    // TODO Add links to all of the images
    const alcorverseCharacters: CharacterLink[] = [
        {
            image: alcor,
            linkPath: '/lore/alcor'
        },
        {
            image: castor,
            linkPath: '/lore/castor'
        }
    ]
    const alcorForms: CharacterLink[] = [
        {
            image: aicore,
            linkPath: '/lore/aicore'
        },
        {
            image: gemini,
            linkPath: '/lore/gemini'
        },
        {
            image: triangulum,
            linkPath: '/lore/triangulum'
        },
        {
            image: eclipse,
        },
        {
            image: jupiter,
            linkPath: '/lore/jupiter'
        },
        {
            image: aquarius,
            linkPath: '/lore/aquarius'
        }
    ]

    const ttrpgOCs: CharacterLink[] = [
        {
            image: soma,
            linkPath: '/lore/soma'
        },
        {
            image: wilton,
        },
        {
            image: poslani,
        }
    ]

    function renderCharacterBadgeRow(characters: CharacterLink[]) {
        return characters.map(value => {
            if (value.linkPath) {
                return <Grid item md={3} xs={6} key={value.linkPath}>
                    <Link to={value.linkPath}>
                        <div className={"character-badge"} style={{padding: 8}}>
                            <SkeletonImage src={value.image} style={{display: "block", width: '100%', borderRadius: 8}}/>
                        </div>
                    </Link>
                </Grid>;
            } else {
                return <Grid item md={3} xs={6} key={value.linkPath}>
                    <div style={{padding: 8}} className={"character-badge disabled"}>
                        <SkeletonImage src={value.image} style={{display: "block", width: '100%', borderRadius: 8}}/>
                    </div>
                </Grid>;
            }
        })
    }

    return <M3Pane>
        <Container>
            <PageHeader title={"Character List"}/>
            <Divider/>
            <Stack direction={"column"} spacing={2}>
                <div>
                    <Typography fontWeight={"bold"} variant={'h6'}>Alcorverse Characters</Typography>
                    <Grid container direction={'row'} spacing={2}>
                        {renderCharacterBadgeRow(alcorverseCharacters)}
                    </Grid>
                </div>
                <div>
                    <Typography fontWeight={"bold"} variant={'h6'}>Alcor Forms</Typography>
                    <Grid container direction={'row'} spacing={2}>
                        {renderCharacterBadgeRow(alcorForms)}
                    </Grid>
                </div>
                <div>
                    <Typography fontWeight={"bold"} variant={'h6'}>Tabletop Game OCs</Typography>
                    <Grid container direction={'row'} spacing={2}>
                        {renderCharacterBadgeRow(ttrpgOCs)}
                    </Grid>
                </div>
            </Stack>
            <Typography style={{marginTop: 16}} variant={"subtitle2"}>I swear, my characters are not gacha characters</Typography>
        </Container>
    </M3Pane>;
}