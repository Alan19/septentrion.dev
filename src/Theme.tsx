// TODO get rid of this
import {createTheme} from "@mui/material";

export const theme = createTheme({
    typography: {
        h5: {
            color: "var(--md-sys-color-primary)"
        },
        h6: {
            color: "var(--md-sys-color-secondary)"
        }
    },
    components: {
        MuiSwitch: {
            styleOverrides: {
                root: {
                    '& .MuiSwitch-switchBase.Mui-checked.MuiSwitch-colorPrimary ': {
                        color: 'var(--md-sys-color-primary)',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked.MuiSwitch-colorPrimary + .MuiSwitch-track': {
                        backgroundColor: 'var(--md-sys-color-primary)',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked.MuiSwitch-colorSecondary ': {
                        color: 'var(--md-sys-color-secondary)',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked.MuiSwitch-colorSecondary + .MuiSwitch-track': {
                        backgroundColor: 'var(--md-sys-color-secondary)',
                    }
                }
            }
        }
    },
    palette: {
        primary: {
            main: "#38608F",
            dark: "#A2C9FE"

        },
        secondary: {
            main: "#535F70",
            dark: "#BBC7DB"
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 2000
        }
    }
});