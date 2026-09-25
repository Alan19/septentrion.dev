import filenamify from "filenamify";
import _ from "lodash";

export function prepareFileName(title: string) {
    return filenamify(_.snakeCase(title));
}