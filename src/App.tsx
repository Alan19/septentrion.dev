import {NavigationRail} from "./components/ui/NavigationRail.tsx";
import "./components/App.css"
import {AppRouter} from "./AppRouter.tsx";
import {HashRouter} from "react-router";
import {CorePalette, argbFromHex} from "@material/material-color-utilities"

function App() {

    console.log(ui("theme", "#5793d1"))

    const colors = CorePalette.fromColors({
        primary: argbFromHex("#B4D1FC"),
        secondary: argbFromHex("#987BFF"),
        tertiary: argbFromHex("#2692FF"),
        error: argbFromHex("#ED4545"),
        neutral:  argbFromHex("#D1D1D6"),
        neutralVariant:  argbFromHex("#D1D1D6"),
    });
    console.log(colors)
    return (
        <HashRouter>
            <div className={"surface-container-high app"}>
                <NavigationRail/>
                <div style={{flex: 1}} className={"content surface"}>
                    <AppRouter/>
                </div>
            </div>
        </HashRouter>
    )
}

export default App
