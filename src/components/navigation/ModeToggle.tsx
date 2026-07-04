import ui from "beercss";
import {useStore} from "@nanostores/react";
import {useEffect} from "react";
import {clsx} from "clsx";
import {currentMode} from "../../util/mode.ts";

export function ModeToggle(props: Readonly<{ className: string }>) {
    const $currentMode = useStore(currentMode) ?? 'auto'

    function nextMode() {
        switch ($currentMode) {
            case "auto":
                currentMode.set('light');
                break;
            case "dark":
                currentMode.set('auto');
                break;
            case "light":
                currentMode.set('dark');
                break;
        }
    }

    function getModeIcon() {
        switch ($currentMode) {
            case "auto":
                return 'auto_mode';
            case "light":
                return 'light_mode';
            case "dark":
                return 'dark_mode';
        }
    }

    useEffect(() => {
        ui('mode', $currentMode)
    }, [$currentMode])

    return (
        <button className={clsx("circle transparent border primary-text", props.className)} onClick={() => nextMode()}>
            <i id="mode-element">{getModeIcon()}</i>
        </button>
    )
}