import {useTagHooks} from "../gallery/UseTagHooks";
import React from "react";
import {Fade, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import Chip from "@mui/material-next/Chip";
import CalendarHeatmap, {ReactCalendarHeatmapValue} from "react-calendar-heatmap";
import 'react-calendar-heatmap/dist/styles.css';
import {M3Pane} from "../common/M3Pane";

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

    const publishedDates = images.reduce<Array<ReactCalendarHeatmapValue<string>>>((previousValue, currentValue) => {
        let find = previousValue.find(value => value.date === currentValue.published);
        if (find) {
            find.count += 1;
            return previousValue;
        } else {
            return [...previousValue, {date: currentValue.published, count: 1}]
        }
    }, [])

    return (
        <Fade in>
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
                            {/*TODO Make dates dynamic, add tooltips, and use theme colors*/}
                            <Typography variant={"h5"} style={{marginTop: 8}} color={"var(--md-sys-color-secondary)"}>Artwork Publish Date Heatmap</Typography>
                            <Typography variant={'h6'} color={'var(--md-sys-color-tertiary)"}>'}>2024</Typography>
                            <CalendarHeatmap showWeekdayLabels startDate={'2024-01-01'} values={publishedDates} endDate={'2024-12-31'}/>

                            <Typography variant={'h6'} color={'var(--md-sys-color-tertiary)"}>'}>2023</Typography>
                            <CalendarHeatmap showWeekdayLabels startDate={'2023-01-01'} values={publishedDates} endDate={'2023-12-31'}/>

                            <Typography variant={'h6'} color={'var(--md-sys-color-tertiary)"}>'}>2022</Typography>
                            <CalendarHeatmap showWeekdayLabels startDate={'2022-01-01'} values={publishedDates} endDate={'2022-12-31'}/>

                            <Typography variant={'h6'} color={'var(--md-sys-color-tertiary)"}>'}>2021</Typography>
                            <CalendarHeatmap showWeekdayLabels startDate={'2021-01-01'} values={publishedDates} endDate={'2021-12-31'}/>
                        </>
                    </M3Pane>
                </Grid>
            </Grid>
        </Fade>
    );
}