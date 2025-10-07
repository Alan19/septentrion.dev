import * as React from "react";
import _ from "lodash";
import {clsx} from "clsx";
import type {ReactNode} from "react";

export type InputSize = "small" | "medium" | "large" | "extra";

interface CommonProps {
    label?: string,
    inputSize?: InputSize,
    inputPrefix?: ReactNode,
    inputSuffix?: ReactNode,
    variant?: "filled" | "outlined",
    addMargin?: boolean,
}

type InputProps = {
    multiline?: false;
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> &
    CommonProps;

type TextareaProps = {
    multiline: true;
} & React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> &
    CommonProps;


type HelperOrError = { helperText: string; errorText?: never }
    | { errorText: string; helperText?: never }
    | { helperText?: never; errorText?: never };

export function BeerCSSTextField(props: (InputProps | TextareaProps) & HelperOrError) {
    const className = clsx("field",
        props.multiline && "textarea",
        !props.addMargin && "no-margin",
        (props.variant ?? "outlined") === "outlined" ? "border" : "fill",
        props.label && "label",
        props.inputPrefix && "prefix",
        props.inputSuffix && "suffix",
        props.inputSize,
        // TODO Figure out a way to fix margin with helper text
        (props.errorText || props.helperText) && "helper-margin",
        'auto-height');

    return <div className={className}>
        {props.inputPrefix}
        {props.multiline ? <textarea {..._.omit(props, ['label', 'inputSize', 'inputPrefix', 'inputSuffix', 'addMargin', 'helperText'])} className={clsx(props.className, props.placeholder && "active")}/> : <input {..._.omit(props as InputProps, ['label', 'inputSize', 'inputPrefix', 'inputSuffix', 'addMargin', 'helperText'])} className={clsx(props.className, props.placeholder && "active")}/>}
        {"type" in props && props.type === 'file' && <input type={"text"}/>}
        <label className={clsx(props.placeholder && "active")}>{props.label}</label>
        {props.inputSuffix}
        {props.helperText && <span className={"helper"}>{props.helperText}</span>}
        {props.errorText && <span className={"error"}>{props.errorText}</span>}
    </div>
}