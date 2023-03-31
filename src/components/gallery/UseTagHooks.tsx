import {useSearchParams} from "react-router-dom";
import {ArtTag} from "../ImageData";
import {TagState} from "./Gallery";

export function useTagHooks() {
    const [tagURLParam, setTagURLParams] = useSearchParams();

    /**
     * Deserializes the tag state from the URL params, basically converts the url a tagstate, with anything that isn't defined in the URL being set to 0
     */
    function getTags(): TagState {
        return Object.values(ArtTag).reduce((previousValue, currentValue) => {
            return {
                ...previousValue,
                [currentValue]: Number(tagURLParam.get(currentValue))
            }
        }, {}) as TagState;
    }

    /**
     * Serializes the changes to the state of tags in the format of {name: -1, 1}. Ignores unselected tags.
     * @param tags The new tag state
     */
    function setTags(tags: TagState) {
        setTagURLParams(Object.values(ArtTag)
            .filter(value => tags[value] !== 0)
            .reduce((previousValue, currentValue) => ({
                ...previousValue,
                [currentValue]: String(tags[currentValue])
            }), {}));
    }

    return {getTags, setTags};
}