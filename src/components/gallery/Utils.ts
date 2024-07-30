import {snakeCase} from "lodash";

export function prepareFileName(title: string) {
    return encodeURIComponent(snakeCase(title));
}
