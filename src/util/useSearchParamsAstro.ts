import {navigate} from "astro:transitions/client";

// Whenever the value is updated, navigate
// Get query params on initial render
export function useSearchParamsAstro(key: string): [string | null, (basepath: string, newValue?: string) => string] {
    const urlSearchParams = new URLSearchParams(window.location.search);
    let initialValue = urlSearchParams.get(key);

    function updateValue(basePath: string, newValue?: string) {
        if (newValue) {
            urlSearchParams.set(key, newValue);
        }
        else {
            urlSearchParams.delete(key);
        }
        return basePath + '?' + urlSearchParams.toString()
    }

    return [initialValue, updateValue]
}