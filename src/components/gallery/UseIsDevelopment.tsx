import {useState} from "react";

export function useIsDevelopment() {
    const [isDevelopment] = useState(process.env.NODE_ENV === "development");

    return {isDevelopment}
}