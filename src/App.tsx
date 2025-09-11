import {NavigationRail} from "./components/layout/NavigationRail.tsx";
import "./components/App.css"

function App() {
    ui("theme", "#5793d1")

    return (
        <div className={"surface-container app"}>
            <NavigationRail/>
            <div style={{flex: 1}} className={"content"}>
                <div className={"surface"} style={{minHeight: "calc(100vh - 2rem)"}}>
                    <main className={"responsive"}>
                        <h1>Hello World!</h1>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default App
