import {AltInformation, getAltAndPageNumber, getParentImage, ImageEntry, ImageInformation, isAltInformation, isAltTypeComplex, isImageInformation} from "../../../api/src/images/ImageInformation.ts";
import {ArtTag, SelectedFilters} from "../../../api/src/images/TagUtils.ts";
import {AltSettings} from "./useAltDisplaySettings.ts";
import axios from "axios";

export function imageSort(a: ImageEntry, b: ImageEntry, mainImages: ImageInformation[]): number {
    const aPublished = isImageInformation(a) ? a.published : mainImages.find(value => value.title === a.parent)?.published as string;
    const bPublished = isImageInformation(b) ? b.published : mainImages.find(value => value.title === b.parent)?.published as string;
    const aTitle = isImageInformation(a) ? a.title : a.parent;
    const bTitle = isImageInformation(b) ? b.title : b.parent;
    const dateComparison = bPublished.localeCompare(aPublished);
    const titleComparison = bTitle.localeCompare(aTitle);
    const altVsParentComparison = (isAltInformation(b) ? 1 : 0) - (isAltInformation(a) ? 1 : 0);
    const complexAltTypeComparison = (isAltTypeComplex((b as AltInformation).altType) ? 1 : 0) - (isAltTypeComplex((a as AltInformation).altType) ? 1 : 0)
    const sequenceNumberComparison = (getAltAndPageNumber(b as AltInformation).pageNumber ?? 0) - (getAltAndPageNumber(a as AltInformation).pageNumber ?? 0);
    const altNumberComparion = (getAltAndPageNumber(b as AltInformation).altNumber ?? 0) - (getAltAndPageNumber(a as AltInformation).altNumber ?? 0);

    return dateComparison || titleComparison || altVsParentComparison || complexAltTypeComparison || sequenceNumberComparison || altNumberComparion;
}

export function getMonthYearPairsInImageSet(images: ImageInformation[]): Set<string> {
    return new Set(images.map(value => value.published.substring(0, 7)));
}

export function getShownImages(images: ImageEntry[], selectedFilters: SelectedFilters, filterMode: "and" | "or", altDisplaySettings: AltSettings) {
    return images.filter(value => {
        if (isImageInformation(value)) {
            return selectedFilters.doesImageMatch(value, filterMode);
        } else {
            return selectedFilters.doesImageMatch({...value, artist: (getParentImage(value.id, images) as ImageInformation).artist}, filterMode) && filterAlts(value, altDisplaySettings);
        }
    });
}

function filterAlts(altInformation: AltInformation, altFilters: AltSettings) {
    const {altType} = altInformation;
    const {displayAlts: alts, displayExtras: extras, displaySequences: sequences, displayCrops: crops, displayRecolors: recolors} = altFilters;
    const cropsMatch = (altType === 'cropped') && crops;
    const recolorsMatch = (altType === 'recolor') && recolors;
    const extrasMatch = (altType === "extra") && extras;
    const sequenceMatch = isAltTypeComplex(altType) && ((altType.pageNumber ?? 0) > 0) && !altType.altNumber && sequences;
    const altMatch = isAltTypeComplex(altType) && ((altType.altNumber ?? 0) > 0) && !altType.pageNumber && alts;
    const altAndSequenceMatch = alts && sequences && isAltTypeComplex(altType);

    return extrasMatch || recolorsMatch || cropsMatch || sequenceMatch || altMatch || altAndSequenceMatch;
}

export function updateTags(tags: ArtTag[], selectedImages: string[], add = true) {
    axios.post("http://localhost:9000/tag", {images: selectedImages, tags: tags, add: add})
        .then((value) => console.log("Finished updating tags on the following artworks: ", value))
        .catch((reason) => console.log(reason))
}


export enum FilterMode {and = "and", or = "or"}