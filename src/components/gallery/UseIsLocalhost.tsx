// noinspection JSIgnoredPromiseFromCall

import axios from "axios";
import {useEffect, useState} from "react";

export function useIsLocalhost() {
    const [isLocalHost, setIsLocalHost] = useState(false);

    async function loadImageInfo() {
        axios.get<string>('http://localhost:9000/users').then(value => setIsLocalHost(value.status === 200)).catch(() => setIsLocalHost(false))
    }

    useEffect(() => {
        loadImageInfo();
    }, []);


    return {isLocalHost}
}