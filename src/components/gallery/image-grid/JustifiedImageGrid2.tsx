import React, {cloneElement} from "react";

export function JustifiedImageGrid2(props: {
    images: { src: string, dimensions: number }[],
    itemSpacing: number,
    rowSpacing: number,
    targetRowHeight: 320,
    targetRowHeightTolerance: .25,
    width: number,
    children: any[]
}) {
    const minAspectRatio = props.width / props.targetRowHeight * (1 - props.targetRowHeightTolerance);
    const maxAspectRatio = props.width / props.targetRowHeight * (1 + props.targetRowHeightTolerance);
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
        const rowWidthWithoutSpacing = props.width - (newItems.length - 1) * props.itemSpacing;
        const targetAspectRatio = rowWidthWithoutSpacing / props.targetRowHeight;
        if (newAspectRatio < minAspectRatio) {
            return [true, 0];
        } else if (newAspectRatio > maxAspectRatio) {
            if (rowBuffer.length === 0) {
                return [true, rowWidthWithoutSpacing / newAspectRatio];
            } else {
                const previousRowWidthWithoutSpacing = props.width - (rowBuffer.length - 1) * props.itemSpacing;
                const previousAspectRatio = rowBuffer.map(data => data.dimensions).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                const previousTargetAspectRatio = previousRowWidthWithoutSpacing / props.targetRowHeight;
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


    props.images.forEach((value, index, array) => {
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
    if (rowBuffer.length !== 0) {
        rows.push({items: rowBuffer, height: rows[rows.length - 1].height})
    }

    console.log(rows);

    let childNodeCounter = -1;

    function renderChildren(data1: { src: string; dimensions: number }, height: number) {
        childNodeCounter++;
        return cloneElement(props.children[childNodeCounter], {
            ...props.children[childNodeCounter].props, style: {
                ...props.children[childNodeCounter].style,
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
                        gap: props.itemSpacing,
                        marginBottom: props.rowSpacing
                    }}>
                        {value.items.map(data => <div>{renderChildren(data, value.height)}</div>)}
                    </div>
                })}
            </div>
        </>
    );
}