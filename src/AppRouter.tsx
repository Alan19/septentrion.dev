import {Homepage} from "./components/pages/homepage/Homepage.tsx";
import {Route, Routes} from "react-router-dom";
import {AboutMePage} from "./components/pages/about/AboutMePage.tsx";

export function AppRouter() {
    return <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/about" element={<AboutMePage/>}/>
    </Routes>;
}