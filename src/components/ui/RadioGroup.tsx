import {BeerCSSRadio} from "./BeerCSSRadio.tsx";
import _ from "lodash";

export function RadioGroup(props: {value: string, setValue: (newValue: string) => unknown, options: string[], label?: string, className?: string, style?: React.CSSProperties}) {
    return (
        <div className={props.className} style={props.style}>
            <b>{props.label}</b>
            <nav>
                {props.options.map(value => <BeerCSSRadio onChange={() => props.setValue(value)} value={value} checked={props.value === value} label={_.capitalize(value)}  />)}
            </nav>
        </div>
    );
}