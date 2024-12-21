import {useTagHooks} from "../gallery/UseTagHooks";
import React, {memo, ReactNode} from "react";
import {Grid, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography} from "@mui/material";
import Chip from "@mui/material-next/Chip";
import CalendarHeatmap, {ReactCalendarHeatmapValue} from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css';
import {M3Pane} from "../common/M3Pane";
import {getHref} from "../ImageInformation";

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

    const publishedDates: ReactCalendarHeatmapValue<string>[] = images.reduce<ReactCalendarHeatmapValue<string>[]>((previousValue, currentValue) => {
        let find = previousValue.find(value => value.date === currentValue.published);
        if (find) {
            find.count += 1;
            return previousValue;
        } else {
            return [...previousValue, {date: currentValue.published, count: 1}];
        }
    }, []);

    function getPublishedDateTooltip(value: ReactCalendarHeatmapValue<string> | undefined) {
        if (!value) {
            return;
        } else {
            return `${value?.count} artwork${value?.count > 1 ? "s" : ""} published on ${value?.date}`;
        }
    }

    function getClassForHeatmapSquare(value: ReactCalendarHeatmapValue<string> | undefined) {
        const count = value?.count ?? 0;
        return !count ? "color-empty" : `color-scale-${Math.min(Number(count), 3)}`;
    }

    function getSquareElement(element: React.ReactElement<SVGRectElement, string | React.JSXElementConstructor<any>>, value: ReactCalendarHeatmapValue<string> | undefined): ReactNode {
        if (value?.count) {
            return <Tooltip title={getPublishedDateTooltip(value)} placement="top">{element}</Tooltip>;
        } else {
            return element;
        }
    }

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
                                        <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>{value[1].map(artistHandle => <a target={"noreferrer noopener"} href={getHref(artistHandle)}>
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
                            <CalendarHeatmap classForValue={getClassForHeatmapSquare}
                                             showWeekdayLabels
                                             startDate={`${value}-01-01`}
                                             values={publishedDates}
                                             transformDayElement={(element, value) => {
                                                 // Something is wrong with the types module, the element should be an element object, not props
                                                 // @ts-ignore
                                                 return getSquareElement(element, value);
                                             }}
                                             endDate={`${value}-12-31`}/>
                        </>)}
                    </>
                </M3Pane>
            </Grid>
        </Grid>
    );
});