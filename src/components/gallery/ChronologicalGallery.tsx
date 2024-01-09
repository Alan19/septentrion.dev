import {Typography} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import {ImageData} from "../ImageData";
import {LazyLoadedImage} from "./LazyLoadedImage";
import {TSJustifiedLayout} from "react-justified-layout-ts";

function ChronologicalGallery(props: {
    displayedImages: ImageData[],
    width: number,
    setCurrentImage: (image: ImageData) => void
}) {
    function getImagesForMonth(year: number, month: number) {
        return props.displayedImages.filter(value => dayjs(value.published, "YYYY-MM-DD").isSame(dayjs().year(year).month(month), "month")).sort((a, b) => dayjs(b.published).unix() - dayjs(a.published).unix());
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
        >
            {imagesForMonth.map(value => <LazyLoadedImage
                src={value.thumbnailUrl ?? value.src}
                title={value.title ?? ""}
                className={"artImage"}
                setCurrentImage={() => props.setCurrentImage(value)}
                aspectRatio={value.aspectRatio ?? 1}/>)}
        </TSJustifiedLayout>
    }


    return <>
        {[2024, 2023, 2022, 2021]
            .map(year => [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
                .filter(month => getImagesForMonth(year, month).length > 0)
                .map(value => <>
                    <Typography variant={"h4"}>{dayjs().month(value).format("MMMM")} {year}</Typography>
                    {renderGalleryForMonth(year, value)}
                </>))}
    </>
}

export default React.memo(ChronologicalGallery)