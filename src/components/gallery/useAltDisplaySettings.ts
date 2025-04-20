import {useQueryState} from "../../UseQueryState.tsx";

export function useAltDisplaySettings(): AltSettings {
    const [displayAlts, setDisplayAlts] = useQueryState<boolean>('alts', false);
    const [displaySequences, setDisplaySequences] = useQueryState<boolean>('sequences', true);
    const [displayExtras, setDisplayExtras] = useQueryState<boolean>('extras', false);
    const [displayRecolors, setDisplayRecolors] = useQueryState<boolean>('recolors', false);
    const [displayCrops, setDisplayCrops] = useQueryState<boolean>('crops', false);
    return {displayAlts, displaySequences, displayExtras, displayRecolors, displayCrops, setDisplayAlts, setDisplayExtras, setDisplayRecolors, setDisplayCrops, setDisplaySequences};
}

export type AltSettings = {
    displayAlts: boolean;
    displaySequences: boolean;
    displayExtras: boolean;
    displayRecolors: boolean;
    displayCrops: boolean;
    setDisplayAlts: (value: boolean) => void;
    setDisplayExtras: (value: boolean) => void;
    setDisplayRecolors: (value: boolean) => void;
    setDisplayCrops: (value: boolean) => void;
    setDisplaySequences: (value: boolean) => void
};
