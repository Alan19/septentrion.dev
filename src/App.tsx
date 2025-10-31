import {NavigationRail} from "./components/ui/NavigationRail.tsx";
import "./components/App.css"
import {AppRouter} from "./AppRouter.tsx";
import {HashRouter} from "react-router";

function App() {
    ui("theme", "#5793d1")

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
