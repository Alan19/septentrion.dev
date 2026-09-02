import type {Option} from "react-multi-select-component";

export const BASE_URL = import.meta.env.BASE_URL.replace('/', '');
export const isDev = import.meta.env.DEV;

// Manually defining this because the type is private in the package
export interface IDefaultItemRendererProps {
    checked: boolean;
    option: Option;
    disabled?: boolean;
    onClick: () => void;
}