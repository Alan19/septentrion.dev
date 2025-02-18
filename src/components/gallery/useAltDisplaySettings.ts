import {parseAsBoolean, useQueryState} from "nuqs";

export function useAltDisplaySettings(): AltSettings {
    const [displayAlts, setDisplayAlts] = useQueryState<boolean>('alts', parseAsBoolean.withDefault(false).withOptions({history: "replace"}));
    const [displaySequences, setDisplaySequences] = useQueryState<boolean>('sequences', parseAsBoolean.withDefault(true).withOptions({history: "replace"}));
    const [displayExtras, setDisplayExtras] = useQueryState<boolean>('extras', parseAsBoolean.withDefault(false).withOptions({history: "replace"}));
    const [displayRecolors, setDisplayRecolors] = useQueryState<boolean>('recolors', parseAsBoolean.withDefault(false).withOptions({history: "replace"}));
    const [displayCrops, setDisplayCrops] = useQueryState<boolean>('crops', parseAsBoolean.withDefault(false).withOptions({history: "replace"}));
    return {displayAlts, displaySequences, displayExtras, displayRecolors, displayCrops, setDisplayAlts, setDisplayExtras, setDisplayRecolors, setDisplayCrops, setDisplaySequences};
}

export type AltSettings = {
    displayAlts: boolean;
    displaySequences: boolean;
    displayExtras: boolean;
    displayRecolors: boolean;
    displayCrops: boolean;
    setDisplayAlts: (value: boolean) => Promise<URLSearchParams>;
    setDisplayExtras: (value: boolean) => Promise<URLSearchParams>;
    setDisplayRecolors: (value: boolean) => Promise<URLSearchParams>;
    setDisplayCrops: (value: boolean) => Promise<URLSearchParams>;
    setDisplaySequences: (value: boolean) => Promise<URLSearchParams>
};
