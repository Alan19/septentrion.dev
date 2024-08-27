import {PageHeader} from "../PageHeader";
import React from "react";
import {Container, Divider, Fade, Grid, Stack, Typography} from "@mui/material";
import aicore from '../about-resources/character-badges/Character_Badge_-page008.png'
import aquarius from '../about-resources/character-badges/Character_Badge_-page007.png'
import castor from '../about-resources/character-badges/Character_Badge_-page006.png'
import soma from '../about-resources/character-badges/Character_Badge_-page005.png'
import jupiter from '../about-resources/character-badges/Character_Badge_-page003.png'
import poslani from '../about-resources/character-badges/Character_Badge_-page010.png'
import eclipse from '../about-resources/character-badges/Character_Badge_-page009.png'
import triangulum from '../about-resources/character-badges/Character_Badge_-page011.png'
import alcor from '../about-resources/character-badges/Character_Badge_-page001.png'
import wilton from '../about-resources/character-badges/Character_Badge_-page004.png'
import {Link} from "react-router-dom";

type CharacterLink = { image: string; linkPath?: string };

export function CharactersPage() {
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
            linkPath: '/about/aicore'
        },
        {
            image: triangulum,
            linkPath: '/about/triangulum'
        },
        {
            image: eclipse,
        },
        {
            image: jupiter,
            linkPath: '/about/jupiter'
        },
        {
            image: aquarius,
            linkPath: '/about/aquarius'
        }
    ]

    const ttrpgOCs: CharacterLink[] = [
        {
            image: soma,
            linkPath: '/about/soma'
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
                return <Grid item md={4}>
                    <Link to={value.linkPath}>
                        <img src={value.image} style={{display: "block", width: '100%', borderRadius: 8}}/>
                    </Link>
                </Grid>;
            } else {
                return <Grid item md={4}>
                    <img src={value.image} style={{display: "block", width: '100%', borderRadius: 8}}/>
                </Grid>;
            }
        })
    }

    return (
        <Fade in>
            <Container maxWidth={"xl"}>
                <Grid container spacing={1}>
                    <Grid item md={8}>
                        <PageHeader title={"Character List"}/>
                        <Divider/>
                        <Stack direction={"column"} spacing={2}>
                            <div>
                                <Typography fontWeight={"bold"} variant={'h6'}>Alcorverse Characters</Typography>
                                <Grid container direction={'row'} spacing={1}>
                                    {renderCharacterBadgeRow(alcorverseCharacters)}
                                </Grid>
                            </div>
                            <div>
                                <Typography fontWeight={"bold"} variant={'h6'}>Alcor Forms</Typography>
                                <Grid container direction={'row'} spacing={1}>
                                    {renderCharacterBadgeRow(alcorForms)}
                                </Grid>
                            </div>
                            <div>
                                <Typography fontWeight={"bold"} variant={'h6'}>Tabletop Game OCs</Typography>
                                <Grid container direction={'row'} spacing={1}>
                                    {renderCharacterBadgeRow(ttrpgOCs)}
                                </Grid>
                            </div>
                        </Stack>
                        <Typography style={{marginTop: 16}} variant={"subtitle2"}>I swear, my characters are not gacha characters</Typography>
                    </Grid>
                    <Grid item md>
                        <div style={{minHeight: '100vh', height: '100%'}}>
                            <img style={{display: 'block', width: '100%', 'height': '100%', objectFit: 'cover'}} src={'https://alcorsiteartbucket.s3.amazonaws.com/thumbnail/natsu_matsuri_2024.webp'}/>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Fade>

    );
}