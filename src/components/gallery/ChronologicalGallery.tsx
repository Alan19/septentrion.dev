import {Typography} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import {ImageData} from "../ImageData";
import {JustifiedImageGrid2} from "./image-grid/JustifiedImageGrid2";

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
        return <JustifiedImageGrid2
            width={props.width}
            rowSpacing={8}
            itemSpacing={8}
            images={imagesForMonth.map(value => ({
                src: value.thumbnailUrl || value.src,
                dimensions: value.aspectRatio || 1
            }))}
        >
            {imagesForMonth.map(value => <img
                src={value.thumbnailUrl ?? value.src}
                alt={value.title}
                loading={"lazy"}
                className={"artImage"}
                onClick={() => props.setCurrentImage(value)}
            />)}
        </JustifiedImageGrid2>
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