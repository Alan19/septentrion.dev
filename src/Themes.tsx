import {extendTheme, Theme} from "@mui/material-next";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCat, faGhost, faGuitar, faHandFist} from "@fortawesome/free-solid-svg-icons";

function createAlcorTheme() {
    return extendTheme({
        ref: {
            palette: {
                "primary": {
                    "0": "#000000",
                    "10": "#001C3B",
                    "20": "#00315F",
                    "30": "#004786",
                    "40": "#285FA1",
                    "50": "#4678BC",
                    "60": "#6192D8",
                    "70": "#7DADF4",
                    "80": "#A6C8FF",
                    "90": "#D5E3FF",
                    "95": "#EBF1FF",
                    "99": "#FDFBFF",
                    "100": "#FFFFFF"
                },
                "secondary": {
                    "0": "#000000",
                    "10": "#121C2A",
                    "20": "#273140",
                    "30": "#3E4757",
                    "40": "#555F70",
                    "50": "#6E7789",
                    "60": "#8891A3",
                    "70": "#A2ACBE",
                    "80": "#BDC7DA",
                    "90": "#D9E3F7",
                    "95": "#EBF1FF",
                    "99": "#FDFBFF",
                    "100": "#FFFFFF"
                },
                "tertiary": {
                    "0": "#000000",
                    "10": "#26142E",
                    "20": "#3D2944",
                    "30": "#543F5C",
                    "40": "#6D5675",
                    "50": "#876F8E",
                    "60": "#A288A9",
                    "70": "#BDA2C4",
                    "80": "#D9BDE0",
                    "90": "#F6D9FD",
                    "95": "#FEEBFF",
                    "99": "#FFFBFF",
                    "100": "#FFFFFF"
                },
                "neutral": {
                    "0": "#000000",
                    "10": "#1A1C1E",
                    "17": "#32353a",
                    "20": "#2F3033",
                    "22": "#32353a",
                    "30": "#46474A",
                    "40": "#5E5E61",
                    "50": "#77777A",
                    "60": "#909094",
                    "70": "#ABABAE",
                    "80": "#C7C6C9",
                    "90": "#E3E2E5",
                    "92": "#e7e8ee",
                    "95": "#EFF1F1",
                    "96": "#f3f3fa",
                    "99": "#FDFBFF",
                    "100": "#FFFFFF"
                },
                "neutralVariant": {
                    "0": "#000000",
                    "10": "#181C22",
                    "20": "#2D3038",
                    "30": "#43474E",
                    "40": "#5B5E66",
                    "50": "#74777F",
                    "60": "#8E9099",
                    "70": "#A8ABB4",
                    "80": "#C4C6CF",
                    "90": "#E0E2EC",
                    "95": "#EEF0FA",
                    "99": "#FDFBFF",
                    "100": "#FFFFFF"
                }
            }
        }
    });
}

export const alcorTheme = createAlcorTheme();

export const alcorDark = createAlcorTheme();

function createCastorTheme() {
    return extendTheme({
        ref: {
            palette: {
                "primary": {
                    "0": "#000000",
                    "10": "#001F23",
                    "20": "#00363C",
                    "30": "#004F56",
                    "40": "#006972",
                    "50": "#00848F",
                    "60": "#13A0AD",
                    "70": "#42BBC8",
                    "80": "#64D7E4",
                    "90": "#90F1FE",
                    "95": "#CCF9FF",
                    "99": "#F5FEFF",
                    "100": "#FFFFFF"
                },
                "secondary": {
                    "0": "#000000",
                    "10": "#081F21",
                    "20": "#1E3437",
                    "30": "#354A4D",
                    "40": "#4C6265",
                    "50": "#657B7E",
                    "60": "#7E9598",
                    "70": "#98AFB3",
                    "80": "#B3CBCE",
                    "90": "#CDE7EB",
                    "95": "#DDF5F8",
                    "99": "#F5FEFF",
                    "100": "#FFFFFF"
                },
                "tertiary": {
                    "0": "#000000",
                    "10": "#0F1B33",
                    "20": "#243049",
                    "30": "#3B4761",
                    "40": "#525E7A",
                    "50": "#6B7794",
                    "60": "#8590AF",
                    "70": "#9FABCA",
                    "80": "#BAC6E6",
                    "90": "#D8E2FF",
                    "95": "#EDF0FF",
                    "99": "#FEFBFF",
                    "100": "#FFFFFF"
                },
                "neutral": {
                    "0": "#000000",
                    "10": "#191C1D",
                    "17": "#232627",
                    "20": "#2E3131",
                    "22": "#393C3C",
                    "30": "#444748",
                    "40": "#505353",
                    "50": "#5C5F5F",
                    "60": "#757778",
                    "70": "#8F9191",
                    "80": "#A9ACAC",
                    "90": "#EFF5F5",
                    "92": "#E3E9EA",
                    "95": "#EFF1F1",
                    "96": "#DEE4E4",
                    "99": "#F5FAFB",
                    "100": "#FFFFFF"
                },
                "neutralVariant": {
                    "0": "#000000",
                    "10": "#151D1E",
                    "20": "#2A3233",
                    "30": "#404849",
                    "40": "#576061",
                    "50": "#70797A",
                    "60": "#8A9293",
                    "70": "#A4ADAE",
                    "80": "#C0C8C9",
                    "90": "#DCE4E5",
                    "95": "#EAF2F3",
                    "99": "#F5FEFF",
                    "100": "#FFFFFF"
                }
            }
        }
    });
}

export const castorTheme = createCastorTheme()

export const somaTheme = extendTheme({
    ref: {
        palette: {
            "primary": {
                "0": "#000000",
                "10": "#241A00",
                "20": "#3B2F0A",
                "30": "#53451F",
                "40": "#6C5D34",
                "50": "#86764B",
                "60": "#A18F62",
                "70": "#BCAA7A",
                "80": "#D9C593",
                "90": "#F6E1AD",
                "95": "#FFEFCD",
                "99": "#FFFBFF",
                "100": "#FFFFFF"
            },
            "secondary": {
                "0": "#000000",
                "10": "#1F1B11",
                "20": "#353025",
                "30": "#4C463A",
                "40": "#645E51",
                "50": "#7D7669",
                "60": "#979082",
                "70": "#B2AA9B",
                "80": "#CEC6B6",
                "90": "#F2E1BB",
                "95": "#F9F0DF",
                "99": "#FFFBFF",
                "100": "#FFFFFF"
            },
            "tertiary": {
                "0": "#000000",
                "10": "#141E15",
                "20": "#293329",
                "30": "#3F493F",
                "40": "#566156",
                "50": "#6F7A6E",
                "60": "#889487",
                "70": "#A3AEA1",
                "80": "#BECABB",
                "90": "#DAE6D7",
                "95": "#E8F4E5",
                "99": "#F6FFF2",
                "100": "#FFFFFF"
            },
            "neutral": {
                "0": "#000000",
                "10": "#1D1B19",
                "17": "#272523",
                "20": "#32302E",
                "22": "#3D3B38",
                "30": "#494644",
                "40": "#54524F",
                "50": "#615E5B",
                "60": "#7A7673",
                "70": "#94908D",
                "80": "#AFAAA7",
                "90": "#FBF3E5",
                "92": "#F0E7D9",
                "95": "#F5F0EC",
                "96": "#EAE1D4",
                "99": "#FFFBFF",
                "100": "#FFFFFF"
            },
            "neutralVariant": {
                "0": "#000000",
                "10": "#1E1B17",
                "20": "#33302B",
                "30": "#4A4641",
                "40": "#625E58",
                "50": "#7B7670",
                "60": "#959089",
                "70": "#B0AAA3",
                "80": "#CBC6BE",
                "90": "#E8E1DA",
                "95": "#F6F0E8",
                "99": "#FFFBFF",
                "100": "#FFFFFF"
            }
        }
    }
})

const wiltonTheme = extendTheme({
    ref: {
        palette: {
            "primary": {
                "0": "#000000",
                "10": "#171E0F",
                "20": "#2C3322",
                "30": "#424937",
                "40": "#59614E",
                "50": "#727A66",
                "60": "#8C947E",
                "70": "#A6AE98",
                "80": "#C2CAB2",
                "90": "#DEE6CD",
                "95": "#ECF4DB",
                "99": "#F9FFE9",
                "100": "#FFFFFF"
            },
            "secondary": {
                "0": "#000000",
                "10": "#1B1C18",
                "20": "#2F312C",
                "30": "#464742",
                "40": "#5E5F59",
                "50": "#777871",
                "60": "#91918A",
                "70": "#ABACA5",
                "80": "#C7C7BF",
                "90": "#DBE7C8",
                "95": "#F2F1E9",
                "99": "#FDFDF4",
                "100": "#FFFFFF"
            },
            "tertiary": {
                "0": "#000000",
                "10": "#161D1C",
                "20": "#2B3231",
                "30": "#414847",
                "40": "#59605F",
                "50": "#717877",
                "60": "#8B9291",
                "70": "#A5ADAB",
                "80": "#C1C8C6",
                "90": "#DDE4E2",
                "95": "#EBF2F1",
                "99": "#F7FEFC",
                "100": "#FFFFFF"
            },
            "neutral": {
                "0": "#000000",
                "10": "#1C1C1A",
                "17": "#262625",
                "20": "#31302F",
                "22": "#3C3B3A",
                "30": "#474745",
                "40": "#535251",
                "50": "#5F5E5D",
                "60": "#787775",
                "70": "#92908E",
                "80": "#ADABA9",
                "90": "#F3F4E9",
                "92": "#E8E9DE",
                "95": "#F3F0EE",
                "96": "#E2E3D8",
                "99": "#F9FFE9",
                "100": "#FFFFFF"
            },
            "neutralVariant": {
                "0": "#000000",
                "10": "#1B1C1A",
                "20": "#30302E",
                "30": "#474744",
                "40": "#5F5E5B",
                "50": "#787774",
                "60": "#92918D",
                "70": "#ACABA7",
                "80": "#C8C6C2",
                "90": "#E4E2DE",
                "95": "#F3F0EC",
                "99": "#FEFCF8",
                "100": "#FFFFFF"
            }
        }
    }
})

export const websiteThemes: { name: AppTheme, icon: React.JSX.Element, theme: Theme }[] = [
    {
        name: "Alcor",
        icon: <FontAwesomeIcon icon={faCat} style={{width: 20, height: 20}}/>,
        theme: alcorTheme
    },
    {
        name: "Castor",
        icon: <FontAwesomeIcon icon={faGhost} style={{width: 20, height: 20}}/>,
        theme: castorTheme
    },
    {
        name: "Soma",
        icon: <FontAwesomeIcon icon={faGuitar} style={{width: 20, height: 20}}/>,
        theme: somaTheme
    },
    {
        name: "Wilton",
        icon: <FontAwesomeIcon icon={faHandFist} style={{width: 24, height: 24}}/>,
        theme: wiltonTheme
    },
]

export type AppTheme = 'Alcor' | 'Castor' | 'Soma' | 'Wilton'