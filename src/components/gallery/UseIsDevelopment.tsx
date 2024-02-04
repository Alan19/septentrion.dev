// noinspection JSIgnoredPromiseFromCall

import axios from "axios";
import {useEffect, useState} from "react";

export function useIsDevelopment() {
    const [isDevelopment, setIsDevelopment] = useState(false);

    async function loadImageInfo() {
        if (process.env.NODE_ENV === "development") {
            axios.get<string>('http://localhost:9000/users').then(value => setIsDevelopment(value.status === 200))
        }
    }

    useEffect(() => {
        loadImageInfo();
    }, []);


    return {isDevelopment}
}