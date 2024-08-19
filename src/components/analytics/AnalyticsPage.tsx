import {useTagHooks} from "../gallery/UseTagHooks";
import {PageHeader} from "../about/PageHeader";
import React from "react";
import {Container, Fade, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Chip from "@mui/material-next/Chip";
import {drawerColor} from "../navigation/NavigationRail";

export function AnalyticsPage() {
    const {images} = useTagHooks();

    const artistCount: Record<string, number> = images.reduce<Record<string, number>>((previousValue, currentValue) => {
        previousValue[currentValue.artist] = (previousValue[currentValue.artist] ?? 0) + 1
        return previousValue;
    }, {})

    // Take the map of artists and the number of artworks I have from them, and collect the ones with the same number into one object
    const artistRanking = Object.entries(artistCount).reduce<Record<number, string[]>>((previousValue, currentValue) => {
        const [artistHandle, artworksFromArtist] = currentValue;
        return ({...previousValue, [artworksFromArtist]: (previousValue[artworksFromArtist] ?? []).concat(artistHandle)});
    }, {});

    const sortedArtistRanking = Object.entries(artistRanking).sort((a, b) => Number(b[0]) - Number(a[0]));

    return (
        <Fade in>
            <Container style={{padding: '16px 0px 0 0px'}}>
                <div style={{
                    background: drawerColor,
                    borderRadius: 24,
                    padding: 16,
                    marginBottom: 16,
                }}>
                    <PageHeader title={'Artist Ranking'}/>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ranking</TableCell>
                                <TableCell>Artwork Count</TableCell>
                                <TableCell>Artist(s)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedArtistRanking.map((value, index) => <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{value[0]}</TableCell>
                                <TableCell>
                                    <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>{value[1].map(artistHandle => <a target={"noreferrer noopener"} href={`https://x.com/${artistHandle.substring(1)}`}>
                                        <Chip size={"small"} label={artistHandle}/></a>)}
                                    </div>
                                </TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </div>
            </Container>
        </Fade>
    );
}