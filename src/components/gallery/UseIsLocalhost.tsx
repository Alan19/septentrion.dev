// noinspection JSIgnoredPromiseFromCall

import axios, {AxiosResponse} from "axios";
import {useEffect, useState} from "react";

export function useIsLocalhost() {
    const [isLocalHost, setIsLocalHost] = useState(false);

    async function loadImageInfo() {
        const response: AxiosResponse = await axios.get<string>('http://localhost:9000/users')
        setIsLocalHost(response.status === 200);
    }

    useEffect(() => {
        loadImageInfo();
    }, []);


    return {isLocalHost}
}