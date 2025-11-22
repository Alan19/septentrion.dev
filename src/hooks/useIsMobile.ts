import {useMediaQuery} from "usehooks-ts";

export function useIsMobile() {
    return useMediaQuery('(max-width:960px)')
}

export function useGetBreakpoint() {
    const isMedium = useMediaQuery('only screen and (min-width: 601px)');
    const isLarge = useMediaQuery('only screen and (min-width: 993px)');
    return isLarge ? 'l' : isMedium ? 'm' : 's';
}