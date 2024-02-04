import {Typography} from "@mui/material";
import React, {Fragment} from "react";
import {ImageInformation} from "../ImageInformation";
import {GalleryImage} from "./GalleryImage";
import {TSJustifiedLayout} from "react-justified-layout-ts";
import {getMonthYearPairsInImageSet} from "./Gallery";


function ChronologicalGallery(props: {
    displayedImages: ImageInformation[],
    width: number,
    setCurrentImage: (image: ImageInformation) => void,
    height?: number
}) {
    function getImagesForMonth(year: number, month: number) {
        return props.displayedImages.filter(value => value.published?.substring(0, 7).split("-").map(Number).toString() === [year, month].toString());
    }

    function renderGalleryForMonth(year: number, month: number) {
        const imagesForMonth = getImagesForMonth(year, month);
        return <TSJustifiedLayout
            width={props.width}
            rowSpacing={8}
            itemSpacing={8}
            layoutItems={imagesForMonth.map(value => (
                value.aspectRatio ?? 1
            ))}
            targetRowHeight={props.height}
        >
            {imagesForMonth.map(value => <GalleryImage
                src={value.thumbnailUrl ?? value.src}
                title={value.title ?? ""}
                className={"artImage"}
                setCurrentImage={() => props.setCurrentImage(value)}
                aspectRatio={value.aspectRatio ?? 1}
                hasAlts={(value.alts?.length ?? 0) > 0}/>)}
        </TSJustifiedLayout>
    }

    function getMonthYearPairs() {
        const strings = Array.from(getMonthYearPairsInImageSet(props.displayedImages)).sort((a, b) => b.localeCompare(a));
        return strings.map(value => value.split("-")).map(value => value.map(Number));
    }

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    return <>
        {getMonthYearPairs().map((yearMonth) => {
            const [year, month] = yearMonth;
            return <Fragment key={yearMonth.join(" ")}>
                <Typography variant={"h4"}>{months[month - 1]} {year}</Typography>
                {renderGalleryForMonth(year, month)}
            </Fragment>;
        })}
    </>
}

export default ChronologicalGallery