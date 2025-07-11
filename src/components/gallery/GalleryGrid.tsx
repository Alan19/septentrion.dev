import {AltInformation, getParentImage, ImageEntry, ImageInformation, isImageInformation} from "../../../api/src/images/ImageInformation.ts";
import {JustifiedGrid} from "react-justified-layout-ts";
import {getMonthYearPairsInImageSet} from "./GalleryUtils.ts";
import React, {Fragment} from "react";
import {Typography, useMediaQuery} from "@mui/material";
import {GalleryImage} from "./GalleryImage.tsx";
import _ from "lodash";
import {GalleryDisplayModes} from "./GalleryDisplayModes.tsx";
import {useTagHooks} from "./useTagHooks.ts";
import {getPublishedDate} from "../../../api/src/utils/utils.ts";
import {materialDesign2Theme} from "../../MaterialDesign2Theme.tsx";

interface GalleryContext {
    altData: Map<string, AltInformation[]>
    selectedImages: string[]
    setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>
    searchParams: string
    isTagging: boolean
    width: number,
    tolerance: number
}

function createJustifiedGrid(images: (ImageInformation | AltInformation)[], context: GalleryContext) {
    return <JustifiedGrid width={context.width}
                              targetRowHeight={350}
                              targetRowHeightTolerance={context.tolerance}
                              rowSpacing={8}
                              itemSpacing={8}
                              containerStyle={{position: "relative"}}
                          aspectRatioList={images.map(value => value.aspectRatio)}>
        {images.map(value => getImageInJustifiedGrid(value, context.altData.has(isImageInformation(value) ? value.title : value.parent), context.selectedImages.includes(value.id), context))}
    </JustifiedGrid>
}

function renderGalleryForMonth(year: number, month: number, displayedImages: (ImageInformation | AltInformation)[], images: (ImageInformation | AltInformation)[], context: GalleryContext) {
    const imagesForMonth = displayedImages.filter(item => getPublishedDate(item, images).substring(0, 7).split("-").map(Number).toString() === [year, month].toString());
    return createJustifiedGrid(imagesForMonth, context);
}

function getImageInJustifiedGrid(value: AltInformation | ImageInformation, hasAlts: boolean, isSelected: boolean, context: GalleryContext) {
    const imageName = isImageInformation(value) ? value.title : value.parent;
    return <GalleryImage aspectRatio={value.aspectRatio}
                         doesImageHaveAlts={hasAlts}
                         id={value.id}
                         imageName={imageName}
                         isSelected={isSelected}
                         onClickWhenTagging={() => context.setSelectedImages(prevState => _.xor(prevState, [value.id]))}
                         searchParams={context.searchParams}
                         src={value.thumbnailUrl}
                         key={imageName}
                         isTagging={context.isTagging}/>;
}

function getMonthlyGalleries(displayedImages: (ImageInformation | AltInformation)[], images: ImageEntry[], context: GalleryContext) {
    const monthsAndYearsWithImages = Array.from(getMonthYearPairsInImageSet(displayedImages.map(value => getParentImage(value.id, images)).filter(value => value !== undefined)))
        .sort((a, b) => b.localeCompare(a))
        .map(value => value.split("-"))
        .map(value => value.map(Number));
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthsAndYearsWithImages.map((yearMonth) => {
        const [year, month] = yearMonth;
        return <Fragment key={yearMonth.join(" ")}>
            <Typography marginTop={1} color={'var(--md-palette-text-secondary)'} variant={"h4"}>{months[month - 1]} {year}</Typography>
            {renderGalleryForMonth(year, month, displayedImages, images, context)}
        </Fragment>;
    });
}

export function GalleryGrid(props: {
    displayMode: GalleryDisplayModes,
    displayedImages: (ImageInformation | AltInformation)[],
    isTagging: boolean,
    pageNumber: number,
    pageSize: number,
    searchParams: string,
    selectedImages: string[],
    setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>,
    width: number
}) {
    const {altData, imageEntries} = useTagHooks();
    const {isTagging, pageNumber, setSelectedImages, displayedImages, width, searchParams, selectedImages, pageSize, displayMode} = props;
    const isMediumOrAbove = useMediaQuery(materialDesign2Theme.breakpoints.up("md"));
    const context: GalleryContext = {
        altData: altData,
        selectedImages: selectedImages,
        setSelectedImages: setSelectedImages,
        searchParams: searchParams,
        isTagging: isTagging,
        width: width,
        tolerance: isMediumOrAbove ? .2 : .5
    }
    const monthlyGalleries = getMonthlyGalleries(displayedImages, imageEntries, context);

    switch (displayMode) {
        case "paginated":
            return monthlyGalleries.slice(pageSize * (pageNumber - 1), pageSize * pageNumber)
        case "monthly":
            return monthlyGalleries
        case "all":
            return createJustifiedGrid(displayedImages, context)
    }
}