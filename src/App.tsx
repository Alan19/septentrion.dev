import {NavigationRail} from "./components/layout/NavigationRail.tsx";
import "./components/App.css"
import {AppRouter} from "./AppRouter.tsx";
import {HashRouter} from "react-router";

function App() {
    ui("theme", "#5793d1")

    return (
        <div className={"surface-container app"}>
            <HashRouter>
                <NavigationRail/>
                <div style={{flex: 1}} className={"content"}>
                    <div className={"surface"} style={{minHeight: "calc(100vh - 2rem)"}}>
                        <main className={"responsive"}>
                            <AppRouter/>
                        </main>
                    </div>
                </div>
            </HashRouter>

        </div>
    )
}

export default App
