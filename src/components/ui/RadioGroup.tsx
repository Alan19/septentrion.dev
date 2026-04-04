import {BeerCSSRadio} from "./BeerCSSRadio.tsx";
import _ from "lodash";

export function RadioGroup(props: Readonly<{ value: string, setValue: (newValue: string) => unknown, options: string[], label?: string, style?: React.CSSProperties }>) {
    return (
        <div style={props.style} className={"bottom-padding"}>
            <b>{props.label}</b>
            <nav>
                {props.options.map(value => <BeerCSSRadio key={value} onChange={() => props.setValue(value)} value={value} checked={props.value === value} label={_.capitalize(value)}/>)}
            </nav>
        </div>
    );
}