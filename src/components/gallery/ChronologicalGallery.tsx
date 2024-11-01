import {Typography} from "@mui/material";
import React, {Fragment} from "react";
import {AltInformation, ImageInformation} from "../ImageInformation";
import {getMonthYearPairsInImageSet} from "./Gallery";
import {SkeletonImage} from "../SkeletonImage";
import {TSJustifiedLayout} from "react-justified-layout-ts";
import {croppedImageWithCurvedBorder} from "../lore/characters/TemplatedLorePage";

function ChronologicalGallery(props: {
    displayedImages: ImageInformation[],
    width: number,
    setCurrentImage: (image: ImageInformation) => void,
    height?: number,
    altInfo: Map<string, AltInformation[]>
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
            containerStyle={{position: "relative"}}
            targetRowHeight={props.height}
        >
            {imagesForMonth.map(value => <SkeletonImage
                onClick={() => props.setCurrentImage(value)}
                style={croppedImageWithCurvedBorder}
                hasAlts={props.altInfo.has(value.title)}
                alt={value.title}
                src={value.thumbnailUrl ?? value.src}
                imageClassname={"artImage"}
                aspectRatio={value.aspectRatio ?? 1}/>)}
        </TSJustifiedLayout>
    }

    function getMonthYearPairs() {
        const strings = Array.from(getMonthYearPairsInImageSet(props.displayedImages)).sort((a, b) => b.localeCompare(a));
        return strings.map(value => value.split("-")).map(value => value.map(Number));
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return <>
        {getMonthYearPairs().map((yearMonth) => {
            const [year, month] = yearMonth;
            return <Fragment key={yearMonth.join(" ")}>
                <Typography marginTop={1} color={'var(--md-palette-text-secondary)'} variant={"h4"}>{months[month - 1]} {year}</Typography>
                {renderGalleryForMonth(year, month)}
            </Fragment>;
        })}
    </>
}

export default ChronologicalGallery