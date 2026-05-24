import React, {memo} from "react";
import CalendarHeatmap, {type ReactCalendarHeatmapValue} from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css';
import {useDocumentTitle} from "usehooks-ts";
import {Container} from "../../ui/Container.tsx";
import {useTagHooks} from "../../../hooks/useTagHooks.ts";
import './analytics.css'
import {Tooltip} from "react-tooltip";

export const AnalyticsPage = memo(function AnalyticsPage() {
    const {images} = useTagHooks();
    useDocumentTitle("Commission Analytics - septentrion.dev");

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
        if (value) {
            return `${value?.count} artwork${value?.count > 1 ? "s" : ""} published on ${value?.date}`;
        }
    }

    function getClassForHeatmapSquare(value: ReactCalendarHeatmapValue<string> | undefined) {
        const count = value?.count ?? 0;
        return count ? `color-scale-${Math.min(Number(count), 3)}` : "color-empty";
    }

    return <Container className={"fade"}>
        <h2 className={"primary-text"}>Commission Heatmap</h2>
        <Tooltip id="my-tooltip" style={{zIndex: 9999}} />
        <div style={{display: "flex", flexDirection: "column", gap: "2rem"}}>
            {Array.from(new Set(images.map(value => value.published.substring(0, 4)))).sort((a, b) => b.localeCompare(a)).map(value => <article key={value} style={{padding: 8, overflowY: "scroll"}}>
                <b className={'tertiary-text'}>{value}</b>
                {/*We have to use a hacky workaround to make the first date work*/}
                <CalendarHeatmap classForValue={getClassForHeatmapSquare}
                                 //@ts-expect-error This prop can accept any object to inject to the react component
                                 tooltipDataAttrs={(value) => {
                                     if (value.count) {
                                         return ({'data-tooltip-content': getPublishedDateTooltip(value), "data-tooltip-id": "my-tooltip"});
                                     }
                                 }}
                                 showWeekdayLabels
                                 startDate={`${Number.parseInt(value) - 1}-12-31`}
                                 values={publishedDates}
                                 endDate={`${value}-12-31`}/>
            </article>)}
        </div>
    </Container>
});