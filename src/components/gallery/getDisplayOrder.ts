import _ from "lodash";
import type {InferEntrySchema} from "astro:content";

export function getDisplayFunction(images:  InferEntrySchema<"artworks">[], componentWidth: number, rowHeightTolerance: number, targetRowHeight: number, itemSpacing: number): [ InferEntrySchema<"artworks">[][], number?] {
    let displayOrder:  InferEntrySchema<"artworks">[][] = [];
    let rowBuffer:  InferEntrySchema<"artworks">[] = [];
    const minRowWidth = componentWidth * (1 / (1 + rowHeightTolerance));
    const maxRowWidth = componentWidth * (1 / (1 - rowHeightTolerance));
    let extraElementAspectRatio;
    images.forEach((value, index, array) => {
        const {aspectRatio} = value
        let currentRowWidth = (_.sum(rowBuffer.map(imgData => imgData.aspectRatio)) * targetRowHeight + aspectRatio * targetRowHeight + itemSpacing * (rowBuffer.length));
        // If the new item's width would cause it to fall between the tolerances for max widths, finish the row
        // If the new item's width would cause it to exceed the tolerances for the row, add it to a new row
        if (rowBuffer.length === 0 || currentRowWidth < maxRowWidth) {
            rowBuffer.push(value);
            if (currentRowWidth > minRowWidth) {
                displayOrder.push(rowBuffer)
                rowBuffer = []
            }
            // If we're handling the last item, and it doesn't exceed the minimum tolerance for the row width, we add a "dummy" item to make the rest of the row now take up the whole width
            else if (index === array.length - 1) {
                extraElementAspectRatio = (componentWidth - _.sum(rowBuffer.map(imgData => imgData.aspectRatio)) * targetRowHeight - itemSpacing * (rowBuffer.length - 1)) / targetRowHeight;
            }
        } else {
            displayOrder.push(rowBuffer)
            rowBuffer = [value];
        }
    })
    if (rowBuffer.length !== 0) {
        displayOrder.push(rowBuffer)
    }
    return [displayOrder, extraElementAspectRatio];
}
