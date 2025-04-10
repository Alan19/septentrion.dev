import axios from "axios";
import {AltInformation, ImageEntry, ImageInformation, isAltInformation, isImageInformation} from "../ImageInformation";
import {useEffect, useState} from "react";
import images from '../../../api/src/images/images.json'
import {SelectedFilters} from "./TagUtils";
import {parseAsString, useQueryState} from "nuqs";

export function useTagHooks() {
    // TODO Make this serialize an object instead
    const [filterString, setFilterString] = useQueryState('filters', parseAsString.withDefault('').withOptions({history: "replace"}));
    const [imageData, setImageData] = useState<(ImageInformation)[]>([]);
    const [altData, setAltData] = useState<Map<string, AltInformation[]>>(new Map());
    const [imageEntries, setImageEntries] = useState<ImageEntry[]>([]);

    useEffect(() => {
        loadImageInfo().then(() => 'Successfully loaded images!');
    }, []);

    async function loadImageInfo() {
        if (process.env.NODE_ENV === "development") {
            await axios.get<ImageEntry[]>('http://localhost:9000/images/')
                .then(value => {
                    setImageData(value.data.filter(isImageInformation));
                    // Filter images for alts, then collect them into a map with their keys being the parent name, and the value being all the alts
                    setAltData(value.data.filter(isAltInformation).reduce((map, alt) => map.set(alt.parent, [...(map.get(alt.parent) ?? []), alt]), new Map()));
                    setImageEntries(value.data);
                });
        } else {
            const jsonImages: ImageEntry[] = images as ImageEntry[];
            setAltData(jsonImages.filter(isAltInformation).reduce((map, alt) => map.set(alt.parent, [...(map.get(alt.parent) ?? []), alt]), new Map()));
            setImageData(jsonImages.filter(isImageInformation));
            setImageEntries(jsonImages);
        }
    }

    return {filters: new SelectedFilters(filterString), setFilters: setFilterString, images: imageData, loadImageInfo, altData, imageEntries};
}
