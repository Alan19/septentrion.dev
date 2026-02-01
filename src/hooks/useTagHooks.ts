import {type AltInformation, type ImageEntry, type ImageInformation, isAltInformation, isImageInformation} from "../../api/src/images/ImageInformation.ts";
import {useEffect, useState} from "react";
import images from '../../api/src/images/images.json'
import hidden from '../../api/src/routes/local_scripts/hidden.json'
import {SelectedFilters} from "../../api/src/images/TagUtils.ts";
import {useQueryState} from "./useQueryState.ts";

// TODO Remove load image info export since we're using an effect to track changes
export function useTagHooks() {
    // TODO Make this serialize an object instead
    const jsonImages: ImageEntry[] = [...images, ...hidden] as ImageEntry[];

    const [filterString, setFilterString] = useQueryState('filters', '');
    const [imageData, setImageData] = useState<(ImageInformation)[]>(jsonImages.filter(isImageInformation));
    const [altData, setAltData] = useState<Map<string, AltInformation[]>>(jsonImages.filter(isAltInformation).reduce((map, alt) => map.set(alt.parent, [...(map.get(alt.parent) ?? []), alt]), new Map()));
    const [imageEntries, setImageEntries] = useState<ImageEntry[]>(jsonImages);

    function loadImageInfo() {
        // Grab images using import, have blank hidden.json file or use an env file locally
        const jsonImages: ImageEntry[] = [...images, ...hidden] as ImageEntry[];
        setAltData(jsonImages.filter(isAltInformation).reduce((map, alt) => map.set(alt.parent, [...(map.get(alt.parent) ?? []), alt]), new Map()));
        setImageData(jsonImages.filter(isImageInformation));
        setImageEntries(jsonImages);
    }

    // Not sure why this works, but it does
    useEffect(() => {
        loadImageInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images, hidden])

    function isImageHidden(entry: ImageInformation): boolean {
        return (hidden as ImageEntry[]).filter(isImageInformation).map(value => value.title).includes(entry.title)
    }

    return {filters: new SelectedFilters(filterString), setFilters: setFilterString, images: imageData, altData, imageEntries, isImageHidden};
}
