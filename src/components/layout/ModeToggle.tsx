import {useLocalStorage} from "usehooks-ts";
import {clsx} from "clsx";
import {useEffect} from "react";

export type Mode = 'light' | 'dark' | 'auto';
export function ModeToggle() {
    const [colorScheme, setColorScheme] = useLocalStorage<Mode>("preferred-color-scheme", "auto");

    // TODO Check if it's possible to detect a night mode switch
    useEffect(() => {
        ui("mode", colorScheme)
    }, [colorScheme]);

    const [iconName, label] = (() => {
        switch(colorScheme) {
            case "light":
                return ["light_mode", "Light"]
            case "dark":
                return ["dark_mode", "Dark"]
            case "auto":
                return ["auto_mode", "System"]
        }
    })()

    const nextColorScheme = (() => {
        switch (colorScheme) {
            case "light":
                return "dark";
            case "dark":
                return "auto";
            case "auto":
                return "light";

        }
    })

    return <>
        <button onClick={() => setColorScheme(nextColorScheme)} className={clsx("circle border extra tertiary-border tertiary-text")}>
            <i>{iconName}</i>
            <span>{label}</span>
        </button>
    </>;
}