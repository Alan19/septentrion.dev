import {useTagHooks} from "../gallery/useTagHooks.ts";
import React, {memo, ReactNode} from "react";
import {Container, Paper, Stack, Tooltip, Typography} from "@mui/material";
import CalendarHeatmap, {ReactCalendarHeatmapValue} from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css';
import {M3Pane} from "../common/M3Pane";
import {useDocumentTitle} from "usehooks-ts";
import {PageHeader} from "../lore/PageHeader.tsx";

export const AnalyticsPage = memo(function AnalyticsPage() {
    const {images} = useTagHooks();
    useDocumentTitle("Commission Analytics");

    const publishedDates: ReactCalendarHeatmapValue<string>[] = images.reduce<ReactCalendarHeatmapValue<string>[]>((previousValue, currentValue) => {
        const find = previousValue.find(value => value.date === currentValue.published);
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

    return <M3Pane>
        <Container>
            <PageHeader title={"Commission Heatmap"}/>
            <Stack spacing={2}>
                {Array.from(new Set(images.map(value => value.published.substring(0, 4)))).sort((a, b) => b.localeCompare(a)).map(value => <Paper key={value} style={{padding: 8}}>
                    <Typography variant={"h6"} color={`var(--md-sys-color-tertiary)`}>{value}</Typography>
                    {/*We have to use a hacky workaround to make the first date work*/}
                    <CalendarHeatmap classForValue={getClassForHeatmapSquare}
                                     showWeekdayLabels
                                     startDate={`${Number.parseInt(value) - 1}-12-31`}
                                     values={publishedDates}
                                     transformDayElement={(element, value) => {
                                         // @ts-expect-error Something is wrong with the types module, the element should be an element object, not props, so we put an element here and suppress the error
                                         return getSquareElement(element, value);
                                     }}
                                     endDate={`${value}-12-31`}/>
                </Paper>)}
            </Stack>
        </Container>
    </M3Pane>
});