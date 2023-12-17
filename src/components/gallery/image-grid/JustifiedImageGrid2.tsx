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
    const rows: { src: string; dimensions: number; height: number }[][] = [];
    let rowBuffer: { src: string; dimensions: number; }[] = [];
    const minAspectRatio = props.width / props.targetRowHeight * (1 - props.targetRowHeightTolerance);
    const maxAspectRatio = props.width / props.targetRowHeight * (1 + props.targetRowHeightTolerance);

    /**
     *
     * @param value The new aspect ratio to be checked
     * @param rowBuffer The buffer of items in the current row
     * @return A boolean array with a length of 2, the first value is whether the buffer can accept the new value, and the second value is whether the buffer should be pushed
     */
    function canItemIntoBuffer(value: {
        src: string;
        dimensions: number
    }, rowBuffer: { src: string; dimensions: number }[], isLast: boolean): [boolean, number] {
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
                const previousTargetAspectRatio = previousRowWidthWithoutSpacing / previousAspectRatio;
                return Math.abs(newAspectRatio - targetAspectRatio) <= Math.abs(previousAspectRatio - previousTargetAspectRatio) ? [false, previousRowWidthWithoutSpacing / previousAspectRatio] : [true, rowWidthWithoutSpacing / newAspectRatio];
            }
        } else {
            return [true, rowWidthWithoutSpacing / newAspectRatio];
        }
    }

    props.images.forEach((value, index, array) => {
        const [canPush, startNewBuffer] = canItemIntoBuffer(value, rowBuffer, index === array.length - 1);
        if (canPush) {
            rowBuffer.push(value);
        }
        if (startNewBuffer || index === array.length - 1) {
            rows.push(rowBuffer.map(data => ({...data, height: startNewBuffer})));
            rowBuffer = [];
        }
    })

    console.log(rows);

    let childNodeCounter = -1;

    function renderChildren(data: { src: string; dimensions: number; height: number }) {
        childNodeCounter++;
        return cloneElement(props.children[childNodeCounter], {
            ...props.children[childNodeCounter].props, style: {
                ...props.children[childNodeCounter].style,
                height: data.height
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
                        justifyContent: "space-between",
                        marginBottom: props.rowSpacing
                    }}>
                        {value.map(data => <div><img src={data.src} style={{height: data.height}}/></div>)}
                    </div>
                })}
            </div>
        </>
    );
}