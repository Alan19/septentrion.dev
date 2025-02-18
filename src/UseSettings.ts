import {useLocalStorage} from "usehooks-ts";
import {AppMode, AppTheme} from "./Themes.tsx";

export function useSettings() {
    const [appTheme, setAppTheme] = useLocalStorage<AppTheme>('theme', AppTheme.alcor);
    const [appMode, setAppMode] = useLocalStorage<AppMode>('mode', AppMode.system);

    return {appTheme, setAppTheme, appMode, setAppMode};
}