import {AltInformation, ImageEntry, ImageInformation, isAltInformation, isImageInformation} from "../../../api/src/images/ImageInformation.ts";
import {useEffect, useState} from "react";
import images from '../../../api/src/images/images.json'
import hidden from '../../../api/src/routes/local_scripts/hidden.json'
import {SelectedFilters} from "../../../api/src/images/TagUtils.ts";
import {useQueryState} from "../../UseQueryState.tsx";

export function useTagHooks() {
    // TODO Make this serialize an object instead
    const [filterString, setFilterString] = useQueryState('filters', '');
    const [imageData, setImageData] = useState<(ImageInformation)[]>([]);
    const [altData, setAltData] = useState<Map<string, AltInformation[]>>(new Map());
    const [imageEntries, setImageEntries] = useState<ImageEntry[]>([]);

    useEffect(() => {
        loadImageInfo().then(() => 'Successfully loaded images!');
    }, []);

    async function loadImageInfo() {
        // Grab images using import, have blank hidden.json file or use an env file locally
        const jsonImages: ImageEntry[] = [...images, ...hidden] as ImageEntry[];
            setAltData(jsonImages.filter(isAltInformation).reduce((map, alt) => map.set(alt.parent, [...(map.get(alt.parent) ?? []), alt]), new Map()));
            setImageData(jsonImages.filter(isImageInformation));
            setImageEntries(jsonImages);
    }

    return {filters: new SelectedFilters(filterString), setFilters: setFilterString, images: imageData, loadImageInfo, altData, imageEntries};
}
