import {extendTheme, Theme} from "@mui/material-next";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCat, faGhost, faGuitar, faHandFist} from "@fortawesome/free-solid-svg-icons";

export enum AppMode {light = "light", dark = "dark", system = "system", clock = "clock"}

export enum AppTheme {alcor = 'Alcor', castor = 'Castor', soma = 'Soma', wilton = 'Wilton'}

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

function createCastorTheme() {
    return extendTheme({
        ref: {
            palette: {
                "primary": {
                    "0": "#000000",
                    "10": "#00201D",
                    "20": "#003732",
                    "30": "#005049",
                    "40": "#006A62",
                    "50": "#00867B",
                    "60": "#01A296",
                    "70": "#3CBEB0",
                    "80": "#5EDACC",
                    "90": "#91F4E7",
                    "95": "#B3FFF4",
                    "99": "#F2FFFC",
                    "100": "#FFFFFF"
                },
                "secondary": {
                    "0": "#000000",
                    "10": "#071F1C",
                    "20": "#1D3431",
                    "30": "#344B48",
                    "40": "#4B635F",
                    "50": "#647C78",
                    "60": "#7D9691",
                    "70": "#97B0AC",
                    "80": "#B2CCC7",
                    "90": "#CEE8E3",
                    "95": "#DCF6F1",
                    "99": "#F2FFFC",
                    "100": "#FFFFFF"
                },
                "tertiary": {
                    "0": "#000000",
                    "10": "#001D32",
                    "20": "#193248",
                    "30": "#30495F",
                    "40": "#486178",
                    "50": "#617A92",
                    "60": "#7A93AD",
                    "70": "#95AEC8",
                    "80": "#B0C9E4",
                    "90": "#CDE5FF",
                    "95": "#E8F2FF",
                    "99": "#FCFCFF",
                    "100": "#FFFFFF"
                },
                "neutral": {
                    "0": "#000000",
                    "10": "#191C1C",
                    "17": "#252B2A",
                    "20": "#2E3130",
                    "22": "#303635",
                    "30": "#444746",
                    "40": "#5C5F5E",
                    "50": "#757876",
                    "60": "#8E9190",
                    "70": "#A9ACAA",
                    "80": "#C4C7C5",
                    "90": "#E1E3E1",
                    "92": "#E3EAE7",
                    "95": "#EFF1EF",
                    "96": "#EFF5F3",
                    "99": "#FBFDFB",
                    "100": "#FFFFFF"
                },
                "neutralVariant": {
                    "0": "#000000",
                    "10": "#151D1C",
                    "20": "#293231",
                    "30": "#3F4947",
                    "40": "#57605E",
                    "50": "#707977",
                    "60": "#899390",
                    "70": "#A4ADAB",
                    "80": "#BFC9C6",
                    "90": "#DBE5E2",
                    "95": "#E9F3F0",
                    "99": "#F5FEFB",
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
                "10": "#251A00",
                "20": "#3F2E00",
                "30": "#5B4300",
                "40": "#785A00",
                "50": "#977100",
                "60": "#B68A00",
                "70": "#D6A412",
                "80": "#F5BF34",
                "90": "#FFDF9C",
                "95": "#FFEFD3",
                "99": "#FFFBFF",
                "100": "#FFFFFF"
            },
            "secondary": {
                "0": "#000000",
                "10": "#251A02",
                "20": "#3B2F12",
                "30": "#534526",
                "40": "#6C5C3C",
                "50": "#867552",
                "60": "#A18F6A",
                "70": "#BDA982",
                "80": "#D9C49C",
                "90": "#F6E0B6",
                "95": "#FFEFD3",
                "99": "#FFFBFF",
                "100": "#FFFFFF"
            },
            "tertiary": {
                "0": "#000000",
                "10": "#032107",
                "20": "#19371A",
                "30": "#2F4E2E",
                "40": "#476644",
                "50": "#5F7F5C",
                "60": "#789974",
                "70": "#92B48D",
                "80": "#ACD0A7",
                "90": "#C8ECC2",
                "95": "#D6FBCF",
                "99": "#F6FFF0",
                "100": "#FFFFFF"
            },
            "neutral": {
                "0": "#000000",
                "10": "#1E1B16",
                "17": "#2E2921",
                "20": "#33302A",
                "22": "#39342B",
                "30": "#4A4640",
                "40": "#625E57",
                "50": "#7C766F",
                "60": "#969088",
                "70": "#B1AAA2",
                "80": "#CCC5BD",
                "90": "#E9E1D9",
                "92": "#F1E7D9",
                "95": "#F7F0E7",
                "96": "#FCF2E5",
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
                "10": "#0E1F1A",
                "20": "#23342E",
                "30": "#394A44",
                "40": "#51625C",
                "50": "#697B74",
                "60": "#83958E",
                "70": "#9DAFA8",
                "80": "#B8CBC3",
                "90": "#D4E7DF",
                "95": "#E2F5ED",
                "99": "#F3FFF9",
                "100": "#FFFFFF"
            },
            "secondary": {
                "0": "#000000",
                "10": "#191C1B",
                "20": "#2D312F",
                "30": "#444846",
                "40": "#5C5F5D",
                "50": "#747876",
                "60": "#8E918F",
                "70": "#A9ACA9",
                "80": "#C4C7C4",
                "90": "#E0E3E0",
                "95": "#EFF1EE",
                "99": "#FAFDFA",
                "100": "#FFFFFF"
            },
            "tertiary": {
                "0": "#000000",
                "10": "#171C20",
                "20": "#2C3135",
                "30": "#43474B",
                "40": "#5A5F63",
                "50": "#73787C",
                "60": "#8D9195",
                "70": "#A7ACB0",
                "80": "#C3C7CB",
                "90": "#DFE3E7",
                "95": "#EDF1F6",
                "99": "#FBFCFF",
                "100": "#FFFFFF"
            },
            "neutral": {
                "0": "#000000",
                "10": "#1B1C1B",
                "17": "#252B29",
                "20": "#303030",
                "22": "#303634",
                "30": "#474746",
                "40": "#5F5E5D",
                "50": "#787776",
                "60": "#92908F",
                "70": "#ACABAA",
                "80": "#C8C6C5",
                "90": "#E4E2E1",
                "92": "#E3EAE5",
                "95": "#F3F0EF",
                "96": "#EFF5F1",
                "99": "#FEFCFA",
                "100": "#FFFFFF"
            },
            "neutralVariant": {
                "0": "#000000",
                "10": "#1B1C1B",
                "20": "#2F3130",
                "30": "#464746",
                "40": "#5E5E5D",
                "50": "#777776",
                "60": "#91918F",
                "70": "#ABABAA",
                "80": "#C7C6C5",
                "90": "#E3E2E1",
                "95": "#F2F0EF",
                "99": "#FDFCFA",
                "100": "#FFFFFF"
            }
        }
    }
})

export const websiteThemes: { name: AppTheme, icon: React.JSX.Element, theme: Theme }[] = [
    {
        name: AppTheme.alcor,
        icon: <FontAwesomeIcon icon={faCat} style={{width: 20, height: 20}}/>,
        theme: alcorTheme
    },
    {
        name: AppTheme.castor,
        icon: <FontAwesomeIcon icon={faGhost} style={{width: 20, height: 20}}/>,
        theme: castorTheme
    },
    {
        name: AppTheme.soma,
        icon: <FontAwesomeIcon icon={faGuitar} style={{width: 20, height: 20}}/>,
        theme: somaTheme
    },
    {
        name: AppTheme.wilton,
        icon: <FontAwesomeIcon icon={faHandFist} style={{width: 24, height: 24}}/>,
        theme: wiltonTheme
    },
]
