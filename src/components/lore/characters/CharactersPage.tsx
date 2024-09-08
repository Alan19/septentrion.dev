import {PageHeader} from "../PageHeader";
import React from "react";
import {Divider, Grid, Stack, Typography} from "@mui/material";
import aicore from '../icons/Character_Badge_-page008.png'
import aquarius from '../icons/Character_Badge_-page007.png'
import castor from '../icons/Character_Badge_-page006.png'
import soma from '../icons/Character_Badge_-page005.png'
import jupiter from '../icons/Character_Badge_-page003.png'
import poslani from '../icons/Character_Badge_-page010.png'
import eclipse from '../icons/Character_Badge_-page009.png'
import triangulum from '../icons/Character_Badge_-page011.png'
import alcor from '../icons/Character_Badge_-page001.png'
import wilton from '../icons/Character_Badge_-page004.png'
import {Link} from "react-router-dom";

type CharacterLink = { image: string; linkPath?: string };

export function CharactersPage() {
    // TODO Add links to all of the images
    const alcorverseCharacters: CharacterLink[] = [
        {
            image: alcor,
        },
        {
            image: castor,
        }
    ]
    const alcorForms: CharacterLink[] = [
        {
            image: aicore,
            linkPath: '/lore/aicore'
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
                return <Grid item md={3} xs={6}>
                    <Link to={value.linkPath}>
                        <img src={value.image} style={{display: "block", width: '100%', borderRadius: 8}}/>
                    </Link>
                </Grid>;
            } else {
                return <Grid item md={3} xs={6}>
                    <img src={value.image} style={{display: "block", width: '100%', borderRadius: 8}}/>
                </Grid>;
            }
        })
    }

    return <>
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
    </>;
}