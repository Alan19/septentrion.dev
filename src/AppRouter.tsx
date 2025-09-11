import {Homepage} from "./components/homepage/Homepage.tsx";
import {Route, Routes} from "react-router-dom";

export function AppRouter() {
    return <Routes>
        <Route path="/" element={<Homepage/>}/>
    </Routes>;
}