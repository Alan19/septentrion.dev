import React, {cloneElement} from "react";

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
    const minAspectRatio = width / targetRowHeight * (1 - targetRowHeightTolerance);
    const maxAspectRatio = width / targetRowHeight * (1 + targetRowHeightTolerance);

    /**
     *
     * @param value The new aspect ratio to be checked
     * @param rowBuffer The buffer of items in the current row
     * @return A boolean array with a length of 2, the first value is whether the buffer can accept the new value, and the second value is whether the buffer should be pushed
     */
    function canAddItemToBuffer(value: {
        src: string;
        dimensions: number
    }, rowBuffer: { src: string; dimensions: number }[]): [boolean, number] {

        const newItems = rowBuffer.concat(value)
        const newAspectRatio = newItems.map(data => data.dimensions).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        const rowWidthWithoutSpacing = width - (newItems.length - 1) * itemSpacing;
        const targetAspectRatio = rowWidthWithoutSpacing / targetRowHeight;
        if (newAspectRatio < minAspectRatio) {
            return [true, 0];
        } else if (newAspectRatio > maxAspectRatio) {
            if (rowBuffer.length === 0) {
                return [true, rowWidthWithoutSpacing / newAspectRatio];
            } else {
                const previousRowWidthWithoutSpacing = width - (rowBuffer.length - 1) * itemSpacing;
                const previousAspectRatio = rowBuffer.map(data => data.dimensions).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                const previousTargetAspectRatio = previousRowWidthWithoutSpacing / targetRowHeight;
                if (Math.abs(newAspectRatio - targetAspectRatio) > Math.abs(previousAspectRatio - previousTargetAspectRatio)) {
                    return [false, previousRowWidthWithoutSpacing / previousAspectRatio];
                } else {
                    return [true, rowWidthWithoutSpacing / newAspectRatio];
                }
            }
        } else {
            return [true, rowWidthWithoutSpacing / newAspectRatio];
        }
    }

    const rows: { items: { src: string; dimensions: number; }[]; height: number; }[] = [];
    let rowBuffer: { src: string; dimensions: number; }[] = [];


    images.forEach((value) => {
        const [canPush, rowHeight] = canAddItemToBuffer(value, rowBuffer);
        if (canPush) {
            rowBuffer.push(value);
        } else {
            rows.push({items: rowBuffer, height: rowHeight})
            rowBuffer = [value];
        }
        if (rowHeight !== 0) {
            rows.push({items: rowBuffer, height: rowHeight})
            rowBuffer = [];
        }
    })

    // Handle orphaned content
    if (showWidows && rowBuffer.length !== 0) {
        rows.push({items: rowBuffer, height: rows[rows.length - 1].height})
    }

    let childNodeCounter = -1;

    function renderChildren(data1: { src: string; dimensions: number }, height: number) {
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
                        {value.items.map(data => <div>{renderChildren(data, value.height)}</div>)}
                    </div>
                })}
            </div>
        </>
    );
}