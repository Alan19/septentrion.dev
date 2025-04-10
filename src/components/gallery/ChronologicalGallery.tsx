import {Typography} from "@mui/material";
import React, {Fragment} from "react";
import {AltInformation, ImageEntry, ImageInformation, isAltInformation, isImageInformation} from "../../../api/src/images/ImageInformation.ts";
import {getMonthYearPairsInImageSet} from "./Gallery";
import {SkeletonImage} from "../SkeletonImage";
import {TSJustifiedLayout} from "react-justified-layout-ts";
import {Link, useSearchParams} from "react-router-dom";
import {croppedImageWithCurvedBorder} from "../common/BorderStyling.ts";

function ChronologicalGallery(props: Readonly<{
    displayedImages: (ImageEntry & { published: string })[],
    width: number,
    setCurrentImage: (image: ImageInformation) => void,
    height?: number,
    altInfo: Map<string, AltInformation[]>,
    tolerance?: number
}>) {
    const [searchParams] = useSearchParams();

    // TODO Fix batch tagging
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
            targetRowHeightTolerance={props.tolerance}
            containerStyle={{position: "relative"}}
            targetRowHeight={props.height}
        >
            {imagesForMonth.map(value => <Link to={{pathname: value.id, search: searchParams.toString()}}>
                <SkeletonImage
                    hasAlts={isAltInformation(value) || props.altInfo.has(value.title)}
                    alt={isAltInformation(value) ? value.parent : value.title}
                    src={value.thumbnailUrl ?? value.src}
                    imageClassname={"artImage"}
                    style={croppedImageWithCurvedBorder}/>
            </Link>)}
        </TSJustifiedLayout>
    }

    function getMonthYearPairs() {
        const strings = Array.from(getMonthYearPairsInImageSet(props.displayedImages.filter(value => isImageInformation(value)))).sort((a, b) => b.localeCompare(a));
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