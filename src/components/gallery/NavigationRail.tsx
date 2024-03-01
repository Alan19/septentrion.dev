import React from "react";
import {BottomNavigation, BottomNavigationAction, Box, Divider, IconButton, Paper, Stack, useMediaQuery} from "@mui/material";
import {materialYouTheme, theme} from "../../App";
import {NavigationRailItem} from "./NavigationRailItem";
import {Home} from "@mui/icons-material";
import CollectionsIcon from "@mui/icons-material/Collections";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDragon} from "@fortawesome/free-solid-svg-icons";
import {Link, useLocation, useNavigate} from "react-router-dom";

function HomeButton() {
    const location = useLocation().pathname;
    return location !== '/' &&
        <Link to={"/"} style={{marginTop: "16px"}}>
            <IconButton>
                <Home/>
            </IconButton>
        </Link>;
}

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
    if (mediumOrAbove) {
        return <Box style={{display: "flex", minHeight: '100vh'}}>
            <div style={{
                display: "flex",
                width: 'min-content',
                minHeight: "100%",
                backgroundColor: materialYouTheme.sys.color.surfaceContainerHigh
            }}>
                <Stack className={"navigation-rail-stack"} spacing={3} style={{position: 'sticky', top: 0, alignSelf: 'start'}}>
                    <NavigationRailItem button={<Home/>} label={"Home"} path={"/"}/>
                    <NavigationRailItem button={<CollectionsIcon/>} label={"Gallery"} path={"/gallery"}/>
                    <NavigationRailItem button={<FontAwesomeIcon icon={faDragon} style={{width: 24, height: 24}}/>} label={"Alcor's Forms"} path={"/alcor_forms"}/>
                </Stack>
                {props.secondPanel && <><Divider orientation="vertical" variant="middle" flexItem/>{props.secondPanel}</>}
            </div>
            <div style={{flexGrow: 1}}>
                {props.children}
            </div>
        </Box>;
    } else {
        return <>
            {props.children}
            <Paper style={{position: 'sticky', bottom: 0}} elevation={3}>
                <BottomNavigation
                    showLabels
                    style={{marginTop: '16px'}}
                    value={location}
                    onChange={(event, newValue) => {
                        navigateFunction(newValue)
                    }}
                >
                    <BottomNavigationAction icon={<Home/>} label={"Home"} value={'/'}/>
                    <BottomNavigationAction color={materialYouTheme.sys.color.primaryContainer} value={'/gallery'} label="Gallery" icon={<CollectionsIcon/>}/>
                    <BottomNavigationAction label="Alcor's Forms" value={'/alcor_forms'} icon={<FontAwesomeIcon icon={faDragon} style={{width: 24, height: 24}}/>}/>
                </BottomNavigation>
            </Paper>
        </>
    }
}