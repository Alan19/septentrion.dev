import React, {useContext, useState} from "react";
import {BottomNavigation, BottomNavigationAction, Box, Dialog, DialogContent, DialogTitle, Divider, Grid, Paper, Stack, Typography, useMediaQuery} from "@mui/material";
import {AppThemeContext, theme} from "../../App";
import {NavigationRailLink} from "./NavigationRailLink";
import {CollectionsOutlined, Computer, DarkMode, Home, HomeOutlined, LightMode, PeopleOutline, Settings} from "@mui/icons-material";
import CollectionsIcon from "@mui/icons-material/Collections";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDragon} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, useColorScheme} from "@mui/material-next";
import {websiteThemes} from "../../Themes";

/**
 * Higher order component that injects a navigation rail or bottom navigation into the child component
 * @param props children: Element to inject into, secondPanel: Optional prop for an extension to the navigation rail
 */
export function NavigationRail(props: {
    children: React.JSX.Element,
    secondPanel?: React.JSX.Element
}) {
    const navigateFunction = useNavigate();
    const mediumOrAbove = useMediaQuery(theme.breakpoints.up("md"));
    const location = useLocation().pathname;
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleClickOpen = () => {
        setIsDialogOpen(true);
    };

    const handleClose = (value: string) => {
        setIsDialogOpen(false);
    };

    const {mode, setMode} = useColorScheme();
    const [appTheme, setAppTheme] = useContext(AppThemeContext);
    const settingsDialog = <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
            <Typography variant={"h6"}>Palette</Typography>
            <Grid container spacing={1} direction={"row"}>
                {websiteThemes.map(value => <Grid item><Button variant={appTheme === value.name ? "filled" : "outlined"} onClick={() => setAppTheme(value.name)} startIcon={value.icon}>{value.name}</Button></Grid>)}
            </Grid>
            <Typography variant={"h6"}>Mode</Typography>
            <Stack direction={"row"} spacing={1}>
                <Button variant={mode === "light" ? "filled" : "outlined"} onClick={() => setMode('light')} startIcon={<LightMode/>}>Light</Button>
                <Button variant={mode === "dark" ? "filled" : "outlined"} onClick={() => setMode('dark')} startIcon={<DarkMode/>}>Dark</Button>
                <Button variant={mode === "system" ? "filled" : "outlined"} startIcon={<Computer/>} onClick={() => setMode('system')}>System</Button>
            </Stack>

        </DialogContent>
    </Dialog>;
    if (mediumOrAbove) {
        return <Box style={{display: "flex", minHeight: '100vh'}}>
            <div style={{
                display: "flex",
                minHeight: "100%",
                backgroundColor: 'var(--md-sys-color-surfaceContainerHigh)'
            }}>
                {settingsDialog}
                <div className={"navigation-rail-stack"} style={{position: 'sticky', top: 0, alignSelf: 'start', padding: '24px 8px 8px', height: '100vh', display: 'flex', flexDirection: 'column', width: "min-content"}}>
                    <Stack spacing={1} style={{flex: 1}}>
                        <NavigationRailLink button={<HomeOutlined/>} label={"Home"} path={"/"}/>
                        <NavigationRailLink button={<CollectionsOutlined/>} label={"Gallery"} path={"/gallery"}/>
                        <NavigationRailLink button={<PeopleOutline/>} label={"About"} path={"/about"}/>
                    </Stack>

                    <div className={`navigation-rail-item`} style={{display: 'grid', alignItems: 'center'}}>
                        <Button variant={"outlined"} onClick={handleClickOpen}><Settings/></Button>
                    </div>
                </div>
                {props.secondPanel && <><Divider orientation="vertical" variant="middle" flexItem/>{props.secondPanel}</>}
            </div>
            <div style={{flexGrow: 1}}>
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
                    style={{marginTop: '16px'}}
                    value={location}
                    onChange={(_event, newValue) => {
                        navigateFunction(newValue)
                    }}
                >
                    {/*TODO Add current page indicator and unify buttons*/}
                    <BottomNavigationAction icon={<Home/>} label={"Home"} value={'/'}/>
                    <BottomNavigationAction color={'var(--md-sys-color-primaryContainer)'} value={'/gallery'} label="Gallery" icon={<CollectionsIcon/>}/>
                    <BottomNavigationAction label="About" value={'/about'} icon={<FontAwesomeIcon icon={faDragon} style={{width: 24, height: 24}}/>}/>
                    <BottomNavigationAction label="Settings" icon={<Settings/>} onClick={handleClickOpen}></BottomNavigationAction>
                </BottomNavigation>
            </Paper>
        </>
    }
}