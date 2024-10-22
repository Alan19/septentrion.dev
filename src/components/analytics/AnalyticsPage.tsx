import {useTagHooks} from "../gallery/UseTagHooks";
import React, {memo} from "react";
import {Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import Chip from "@mui/material-next/Chip";
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css';
import {M3Pane} from "../common/M3Pane";

export const AnalyticsPage = memo(function AnalyticsPage() {
    const {images} = useTagHooks();

    const artistCount: Record<string, number> = images.reduce<Record<string, number>>((previousValue, currentValue) => {
        previousValue[currentValue.artist] = (previousValue[currentValue.artist] ?? 0) + 1;
        return previousValue;
    }, {});

    // Take the map of artists and the number of artworks I have from them, and collect the ones with the same number into one object
    const artistRanking = Object.entries(artistCount).reduce<Record<number, string[]>>((previousValue, currentValue) => {
        const [artistHandle, artworksFromArtist] = currentValue;
        return ({...previousValue, [artworksFromArtist]: (previousValue[artworksFromArtist] ?? []).concat(artistHandle)});
    }, {});

    const sortedArtistRanking = Object.entries(artistRanking).sort((a, b) => Number(b[0]) - Number(a[0]));

    return (
        <Grid container spacing={2}>
            <Grid item md={6}>
                <M3Pane lastElement={false}>
                    <>
                        <Typography variant={"h5"} color={"var(--md-sys-color-secondary)"}>Artist Commission Counts</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ranking</TableCell>
                                    <TableCell>Artwork Count</TableCell>
                                    <TableCell>Artist(s)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedArtistRanking.filter(value => Number(value[0]) !== 1).map((value, index) => <TableRow>
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
                    </>
                </M3Pane>
            </Grid>
            <Grid item md={6}>
                <M3Pane>
                    <>
                        <Typography variant={"h5"} style={{marginTop: 8, marginBottom: 8}} color={"var(--md-sys-color-secondary)"}>Artwork Publish Date Heatmap</Typography>
                        {Array.from(new Set(images.map(value => value.published.substring(0, 4)))).sort((a, b) => b.localeCompare(a)).map(value => <>
                            <Typography variant={"h6"} color={"var(--md-sys-color-tertiary)\"}>"}>{value}</Typography>
                            <CalendarHeatmap startDate={new Date('2016-01-01')}
                                             endDate={new Date('2016-04-01')}
                                             values={[
                                                 {date: '2016-01-01', count: 12},
                                                 {date: '2016-01-22', count: 122},
                                                 {date: '2016-01-30', count: 38}]
                                             }
                            />
                        </>)}
                    </>
                </M3Pane>
            </Grid>
        </Grid>
    );
});