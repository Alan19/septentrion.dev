import {Homepage} from "./components/pages/homepage/Homepage.tsx";
import {Route, Routes} from "react-router-dom";
import {AboutRoot} from "./components/pages/about/AboutRoot.tsx";
import {AnalyticsPage} from "./components/pages/analytics/AnalyticsPage.tsx";
import {Gallery} from "./components/pages/gallery/Gallery.tsx";
import {Artwork} from "./components/pages/gallery/Artwork.tsx";
import {OCList} from "./components/pages/lore/OCList.tsx";
import {AboutMe} from "./components/pages/about/subpages/AboutMe.tsx";
import {Changelog} from "./components/pages/about/subpages/Changelog.tsx";
import {Credits} from "./components/pages/about/subpages/Credits.tsx";
import {AstralWaveIntro} from "./components/pages/about/subpages/AstralWaveIntro.tsx";
import {Worlds} from "./components/pages/about/subpages/Worlds.tsx";
import type {JSX} from "react";

export const aboutSubRoutes: {path: string, name: string, element: JSX.Element}[] = [
    {name: "Crossovers", path: "crossovers", element: <Worlds />},
    {name: "Astral Wave", path: "astral_wave", element: <AstralWaveIntro />},
    {name: "Credits", path: "credits", element: <Credits />},
    // {name: "My Vanguard Decks", path: "decks", element: <VGDecks />},
    {name: "Changelog", path: "changelog", element: <Changelog />},
]

export function AppRouter() {
    return <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/about" element={<AboutRoot/>}>
            <Route index element={<AboutMe/>}/>
            {aboutSubRoutes.map(value => <Route path={`/about/${value.path}`} element={value.element} />)}
        </Route>
        <Route path="/analytics" element={<AnalyticsPage/>}/>
        <Route path="/gallery">
            <Route index element={<Gallery/>}/>
            <Route path=":id" element={<Artwork/>}/>
        </Route>
        <Route path="/lore" element={<OCList/>}/>
    </Routes>;
}