import {Container} from "../../ui/Container.tsx";
import {JustifiedGrid} from "react-justified-layout-ts";
import {useTagHooks} from "../../../hooks/useTagHooks.ts";
import useMeasure from 'react-use-measure';
import {GallerySearchbar} from "./GallerySearchbar.tsx";
import {useSearchParams} from "react-router-dom";
import {ArtworkUploader} from "./uploader-modal/ArtworkUploader.tsx";
import {useDocumentTitle} from "usehooks-ts";
import {useQueryState} from "../../../hooks/useQueryState.ts";
import {GalleryPagination} from "./GalleryPagination.tsx";
import type {ImageInformation} from "../../../../api/src/images/ImageInformation.ts";
import {RadioGroup} from "../../ui/RadioGroup.tsx";
import {GalleryImage} from "./GalleryImage.tsx";
import {useIsDevelopment} from "../../../hooks/useIsDevelopment.ts";

export function Gallery() {
    const {images, altData, filters} = useTagHooks();
    const [ref, bounds] = useMeasure({polyfill: ResizeObserver});
    // TODO Remove pages when you navigate
    const [page, setPage] = useQueryState("page", 1)
    const [displayMode, setDisplayMode] = useQueryState<"paginated" | "monthly" | "all">("displayMode", "paginated")
    const [filterMode, setFilterMode] = useQueryState<"and" | "or">("filterMode", "and")
    const [searchParams] = useSearchParams();
    const isDevelopment = useIsDevelopment();

    const pageSize = 4;

    useDocumentTitle("Gallery - septentrion.dev");

    const displayedImages = images.filter(value => filters.doesImageMatch(value, filterMode)).sort((a, b) => b.published.localeCompare(a.published))
    const yearMonthPairs = Array.from(new Set(displayedImages.map(value => value.published.substring(0, 7)))).sort((a, b) => b.localeCompare(a));
    const displayedMonths = displayMode === "monthly" ? yearMonthPairs : yearMonthPairs.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    const imagesForMonth: { [monthYear: string]: ImageInformation[] } = displayedImages.reduce<{ [monthYear: string]: ImageInformation[] }>((previousValue, currentValue) => ({...previousValue, [currentValue.published.substring(0, 7)]: (previousValue[currentValue.published.substring(0, 7)] ?? []).concat(currentValue)}), {})

    return <>
        <Container className={"fade"}>
            <div ref={ref}></div>
            <h1 className={"primary-text"}>Gallery</h1>
            <fieldset className={"bottom-margin"}>
                <legend>Filter Settings</legend>
                <RadioGroup value={filterMode} setValue={setFilterMode} options={["and", "or"]} label={"Filter Mode"} className={"bottom-margin"}/>
                <GallerySearchbar/>
                <RadioGroup value={displayMode} setValue={setDisplayMode} options={["paginated", "monthly", "all"]} label={"Display Mode"} className={"bottom-margin top-margin"}/>
            </fieldset>
            {(displayMode === "paginated" || displayMode === "monthly") && displayedMonths.map(value => {
                const imagesInMonth = imagesForMonth[value]
                return <>
                    <h4>{value}</h4>
                    <JustifiedGrid aspectRatioList={imagesInMonth.map(image => image.aspectRatio)} width={bounds.width}>
                        {imagesInMonth.map(value => <GalleryImage value={value}  searchParams={searchParams.toString()} hasAlts={altData.has(value.title)}/>)}
                    </JustifiedGrid>
                </>;
            })}
            {displayMode === "all" && <JustifiedGrid aspectRatioList={displayedImages.map(value => value.aspectRatio)} width={bounds.width} targetRowHeight={350}>
                {displayedImages.map(value => <GalleryImage value={value}  searchParams={searchParams.toString()} hasAlts={altData.has(value.title)}/>)}
            </JustifiedGrid>}
            {displayMode === "paginated" && <div className={"top-margin"}><GalleryPagination page={page} className={"right-align"} setPage={setPage} maxPages={Math.ceil(yearMonthPairs.length / pageSize)}/></div>}
        </Container>
        {isDevelopment && <ArtworkUploader variant={"parent"}/>}
    </>;
}