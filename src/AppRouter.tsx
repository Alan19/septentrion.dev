import {Homepage} from "./components/pages/homepage/Homepage.tsx";
import {Route, Routes} from "react-router-dom";
import {AboutMePage} from "./components/pages/about/AboutMePage.tsx";
import {AnalyticsPage} from "./components/pages/analytics/AnalyticsPage.tsx";
import {Gallery} from "./components/pages/gallery/Gallery.tsx";
import {Artwork} from "./components/pages/gallery/Artwork.tsx";

export function AppRouter() {
    return <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/about" element={<AboutMePage/>}/>
        <Route path="/analytics" element={<AnalyticsPage/>}/>
        <Route path="/gallery">
            <Route index element={<Gallery/>}/>
            <Route path=":id" element={<Artwork/>}/>
        </Route>
    </Routes>;
}