import React, {cloneElement, useEffect, useState} from "react";
import {Skeleton, useMediaQuery} from "@mui/material";
import {theme} from "../../../App";

type JustifiedImageGridProps = {
    images: { src: string, dimensions: number }[];
    itemSpacing: number;
    rowSpacing: number;
    targetRowHeight: number;
    targetRowHeightTolerance: number;
    width: number;
    children: any[];
    showWidows: boolean;
}

export function JustifiedImageGrid2({
                                        children,
                                        images,
                                        itemSpacing = 10,
                                        rowSpacing = 10,
                                        showWidows = true,
                                        targetRowHeight = 320,
                                        targetRowHeightTolerance = .25,
                                        width,
                                    }: JustifiedImageGridProps) {
    const sources = images.map(value => value.src);

    function checkIfImagesAreCached() {
        return sources.every(value => {
            const image = new Image();

            image.src = value;
            return image.complete;
        })
    }

    const [isReady, setIsReady] = useState(false);

    async function loadAll() {
        setIsReady(checkIfImagesAreCached())
        console.log("Loading all images");
        const promises = sources.map((source) => {
            return new Promise<void>((resolve) => {
                const img = new Image();
                img.src = source;
                img.onload = () => resolve();
            });
        });

        return Promise.all(promises).then(() => console.log("All done"));
    }

    useEffect(() => {
        loadAll().then(() => {
            console.log("Flipping the switch!")
            setIsReady(true);
        });
    }, [images]);

    const minAspectRatio = width / targetRowHeight * (1 - targetRowHeightTolerance);
    const maxAspectRatio = width / targetRowHeight * (1 + targetRowHeightTolerance);

    /**
     *
     * @param value The new aspect ratio to be checked
     * @return A boolean array with a length of 2, the first value is whether the buffer can accept the new value, and the second value is whether the buffer should be pushed
     * */
    function addItem(value: {
        src: string;
        dimensions: number
    }) {
        const newItems = rowBuffer.concat(value)
        const newAspectRatio = newItems.map(data => data.dimensions).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        const rowWidthWithoutSpacing = width - (newItems.length - 1) * itemSpacing;
        const targetAspectRatio = rowWidthWithoutSpacing / targetRowHeight;
        if (newAspectRatio < minAspectRatio) {
            rowBuffer.push(value);
            return true;
        } else if (newAspectRatio > maxAspectRatio) {
            if (rowBuffer.length === 0) {
                rowBuffer.push(value);
                rows.push({items: rowBuffer, height: rowWidthWithoutSpacing / newAspectRatio});
                rowBuffer = [];
                return true;
            } else {
                const previousRowWidthWithoutSpacing = width - (rowBuffer.length - 1) * itemSpacing;
                const previousAspectRatio = rowBuffer.map(data => data.dimensions).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                const previousTargetAspectRatio = previousRowWidthWithoutSpacing / targetRowHeight;
                if (Math.abs(newAspectRatio - targetAspectRatio) > Math.abs(previousAspectRatio - previousTargetAspectRatio)) {
                    rows.push({items: rowBuffer, height: previousRowWidthWithoutSpacing / previousAspectRatio})
                    rowBuffer = []
                    return false;
                } else {
                    rowBuffer.push(value);
                    rows.push({items: rowBuffer, height: rowWidthWithoutSpacing / newAspectRatio})
                    rowBuffer = []
                    return true;
                }
            }
        } else {
            rowBuffer.push(value);
            rows.push({items: rowBuffer, height: rowWidthWithoutSpacing / newAspectRatio})
            rowBuffer = []
            return true;
        }
    }

    const rows: { items: { src: string; dimensions: number; }[]; height: number; }[] = [];
    let rowBuffer: { src: string; dimensions: number; }[] = [];


    images.forEach((value) => {
        const isItemSuccessfullyAdded = addItem(value);
        if (!isItemSuccessfullyAdded) {
            addItem(value);
        }
    })

    const isSmallOrAbove = useMediaQuery(theme.breakpoints.up('sm'));
    // Handle orphaned content
    if (showWidows && rowBuffer.length !== 0) {
        if (isSmallOrAbove) {
            rows.push({items: rowBuffer, height: rows[rows.length - 1].height})
        } else {
            const aspectRatio = rowBuffer.map(value => value.dimensions).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            const rowWidthWithoutSpacing = width - (rowBuffer.length - 1) * itemSpacing;
            rows.push({items: rowBuffer, height: rowWidthWithoutSpacing / aspectRatio})
        }
    }

    let childNodeCounter = -1;

    function renderChildren(height: number) {
        childNodeCounter++;
        return cloneElement(children[childNodeCounter], {
            ...children[childNodeCounter].props, style: {
                ...children[childNodeCounter].style,
                height: height
            }
        })

    }

    return (
        <>
            <div style={{width: "100%"}}>
                {rows.map(value => {
                    return <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: itemSpacing,
                        marginBottom: rowSpacing
                    }}>
                        {value.items.map(data => <div style={{height: value.height}}>
                            {isReady ? renderChildren(value.height) : <Skeleton variant={"rectangular"} style={{
                                height: value.height,
                                width: data.dimensions * value.height
                            }}/>}
                        </div>)}
                    </div>
                })}
            </div>
        </>
    );
}