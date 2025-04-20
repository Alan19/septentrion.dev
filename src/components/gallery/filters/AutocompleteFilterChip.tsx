import Chip from "@mui/material-next/Chip";

export function AutocompleteFilterChip(props: Readonly<{ option: string, tagProps: { key: number; className: string; disabled: boolean; "data-tag-index": number; tabIndex: -1; onDelete: (event: any) => void } }>) {
    return <Chip
        color={props.option.startsWith("-") ? "error" : "primary"}
        {...props.tagProps}
        size={"small"}
        label={props.option} {...props.tagProps} />;
}