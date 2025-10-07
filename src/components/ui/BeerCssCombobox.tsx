import React, {useRef} from "react";
import {MultiSelect, type Option} from "react-multi-select-component";
import {useInjectClass} from "../../hooks/useInjectClass.ts";
import './index.css'
export function BeerCssCombobox({onChange, options, placeholder, value, isCreatable, className, filterOptions}: { value: Option[], onChange: (selectedOption: Option[]) => void, options: Option[], placeholder?: string, isCreatable?: boolean, className?: string, filterOptions?: (options: Option[], filter: string) => Promise<Option[]> | Option[] }) {
    const ref = useRef<HTMLDivElement>(null);
    useInjectClass(ref, "dropdown-container", ["field", "border", "middle-align"])

    interface IDefaultItemRendererProps {
        checked: boolean;
        option: Option;
        disabled?: boolean;
        onClick?: React.ChangeEventHandler<HTMLInputElement>;
    }

    return <div ref={ref}>
        <MultiSelect
            filterOptions={filterOptions}
            options={options}
            hasSelectAll={false}
            valueRenderer={(selected) => selected.length ? <div>
                {selected.map(value1 => <button onClick={() => onChange(value.filter(value => value1.value !== value.value))} className="chip round tiny-margin">
                    <span>{value1.label}</span>
                    <i>close</i>
                </button>)
                }
            </div> : placeholder}
            ArrowRenderer={({expanded}) => expanded ? <i>arrow_drop_up</i> : <i>arrow_drop_down</i>}
            ItemRenderer={({checked, option, disabled, onClick}: IDefaultItemRendererProps) => <label className={`item-renderer ${disabled ? "disabled" : ""} checkbox middle-align tiny-margin`}>
                <input
                    type="checkbox"
                    className={"ripple"}
                    onChange={onClick}
                    checked={checked}
                    tabIndex={-1}
                    disabled={disabled}
                />
                <span>{option.label}</span>
            </label>}
            value={value}
            onChange={onChange}
            labelledBy="Select"
            isCreatable={isCreatable}
            className={className}
        />
    </div>;
}
