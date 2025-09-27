import {Homepage} from "./components/pages/homepage/Homepage.tsx";
import {Route, Routes} from "react-router-dom";
import {AboutMePage} from "./components/pages/about/AboutMePage.tsx";
import {AnalyticsPage} from "./components/pages/analytics/AnalyticsPage.tsx";

export function AppRouter() {
    return <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/about" element={<AboutMePage/>}/>
        <Route path="/analytics" element={<AnalyticsPage/>}/>
    </Routes>;
}