import React, {useContext, useEffect, useState} from "react";
import {BottomNavigation, BottomNavigationAction, Box, Dialog, DialogContent, DialogTitle, Grid, Paper, Stack, Typography, useMediaQuery} from "@mui/material";
import {Book, BookOutlined, CollectionsOutlined, Computer, DarkMode, Home, HomeOutlined, LightMode, Pending, Person, PersonOutlined, Schedule, Search, SearchOutlined, Settings} from "@mui/icons-material";
import CollectionsIcon from "@mui/icons-material/Collections";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, useColorScheme} from "@mui/material-next";
import {websiteThemes} from "../../Themes";
import "../../App.css"
import {NavigationRailLink} from "./NavigationRailLink";
import SunCalc from 'suncalc';
import {useLocalStorage} from "../../UseLocalStorage";
import {AppThemeContext, theme} from "../../App.tsx";

export const drawerColor = 'var(--md-sys-color-surfaceContainerHigh)';

/**
 * Higher order component that injects a navigation rail or bottom navigation into the child component
 * @param props children: Element to inject into, secondPanel: Optional prop for an extension to the navigation rail
 */
export function Navigation(props: Readonly<{ children: React.JSX.Element }>) {
    const navigateFunction = useNavigate();
    const mediumOrAbove = useMediaQuery(theme.breakpoints.up("md"));
    const location = useLocation().pathname;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [internalMode, setInternalMode] = useLocalStorage('light', 'mode')
    const [loadingCoordinates, setLoadingCoordinates] = useState<boolean>(false)

    const handleClickOpen = () => {
        setIsDialogOpen(true);
    };

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        if (internalMode !== 'clock') {
            setMode(internalMode);
        } else {
            setLoadingCoordinates(true);
            navigator.geolocation.getCurrentPosition((position) => {
                const now = new Date();
                const sunset = SunCalc.getTimes(now, position.coords.latitude, position.coords.longitude).sunset;
                const sunrise = SunCalc.getTimes(now, position.coords.latitude, position.coords.longitude).sunrise;
                if (now > sunset || now < sunrise) {
                    setMode('dark')
                } else {
                    setMode('light')
                }
                setLoadingCoordinates(false);
            }, positionError => {
                // TODO add error toast
                setLoadingCoordinates(false);
            });
        }
    }, [internalMode])

    const {mode, setMode} = useColorScheme();
    const [appTheme, setAppTheme] = useContext(AppThemeContext);
    // TODO Add display to hide sensitive images
    const settingsDialog = <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
            <Typography variant={"h6"}>Palette</Typography>
            <Grid container spacing={1} direction={"row"}>
                {websiteThemes.map(value => <Grid item><Button variant={appTheme === value.name ? "filled" : "outlined"} onClick={() => setAppTheme(value.name)} startIcon={value.icon}>{value.name}</Button></Grid>)}
            </Grid>
            <Typography variant={"h6"}>Mode</Typography>
            <Stack direction={"row"} spacing={1}>
                <Button variant={internalMode === "light" ? "filled" : "outlined"} disabled={loadingCoordinates} onClick={() => setInternalMode('light')} startIcon={<LightMode/>}>Light</Button>
                <Button variant={internalMode === "dark" ? "filled" : "outlined"} disabled={loadingCoordinates} onClick={() => setInternalMode('dark')} startIcon={<DarkMode/>}>Dark</Button>
                <Button variant={internalMode === "system" ? "filled" : "outlined"} disabled={loadingCoordinates} startIcon={<Computer/>} onClick={() => setInternalMode('system')}>System</Button>
                {/*TODO Add better animations*/}
                <Button variant={internalMode === "clock" ? "filled" : "outlined"} startIcon={<Schedule/>} endIcon={loadingCoordinates ? <Pending/> : <></>} onClick={() => setInternalMode('clock')}>Time Based</Button>
            </Stack>

        </DialogContent>
    </Dialog>;

    // TODO Rethink how to style this
    let castorStampStyle = location !== '/' && {
        backgroundColor: drawerColor,
        backgroundImage: 'url(castor_stamp.png)',
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "right 24px bottom 24px",
        backgroundBlendMode: mode === 'light' ? 'color-burn' : 'darken',
        backgroundSize: "80vh",
    };

    const links = [
        {
            selectedIcon: <Home/>,
            icon: <HomeOutlined/>,
            label: "Home",
            path: "/"
        },
        {
            selectedIcon: <CollectionsIcon/>,
            icon: <CollectionsOutlined/>,
            label: "Gallery",
            path: "/gallery"
        },
        {
            selectedIcon: <Person/>,
            icon: <PersonOutlined/>,
            label: "About",
            path: "/about"
        },
        {
            selectedIcon: <Book/>,
            icon: <BookOutlined/>,
            label: "Lore",
            path: "/lore"
        },
        {
            selectedIcon: <Search/>,
            icon: <SearchOutlined/>,
            label: "Analytics",
            path: "/analytics"
        },

    ]

    if (mediumOrAbove) {
        return <Box style={{display: "flex", minHeight: '100vh'}}>
            {settingsDialog}
            <div className={"navigation-rail-stack"} style={{
                position: 'sticky',
                top: 0,
                alignSelf: 'start',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                width: "5rem",
                backgroundColor: drawerColor,
                padding: "24px 16px"
            }}>
                <Stack spacing={'12px'} style={{flex: 1}}>
                    {links.map(value => <NavigationRailLink selectedButton={value.selectedIcon} button={value.icon} label={value.label} path={value.path}/>)}
                </Stack>

                <div className={`navigation-rail-item`} style={{display: 'grid', alignItems: 'center'}}>
                    <Button variant={"outlined"} onClick={handleClickOpen}><Settings/></Button>
                </div>
            </div>
            <div style={{flexGrow: 1, overflow: 'hidden'}}>
                {props.children}
            </div>
        </Box>;
    } else {
        return <>
            {settingsDialog}
            {props.children}
            <Paper style={{position: 'sticky', bottom: 0}} elevation={3}>
                <BottomNavigation
                    showLabels
                    style={{marginTop: '16px', background: drawerColor}}
                    value={location}
                    onChange={(_event, newValue) => {
                        navigateFunction(newValue)
                    }}
                >
                    {/*TODO Add current page indicator and unify buttons*/}
                    {links.map(value => <BottomNavigationAction icon={value.icon} label={value.label} value={value.path}/>)}
                </BottomNavigation>
            </Paper>
        </>
    }
}