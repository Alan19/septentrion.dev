import axios from "axios";
import {useEffect, useState} from "react";

export function useIsDevelopment() {
    const [isDevelopment, setIsDevelopment] = useState(false);

    async function loadImageInfo() {
        if (process.env.NODE_ENV === "development") {
            return axios.get<string>('http://localhost:9000/users')
        }
    }

    useEffect(() => {
        loadImageInfo().then(value => setIsDevelopment(value !== undefined && value.status === 200));
    }, []);


    return {isDevelopment}
}