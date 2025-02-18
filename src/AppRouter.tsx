import {LinksPage} from "./components/links/LinksPage.tsx";
import {Gallery} from "./components/gallery/Gallery.tsx";
import {ArtworkPage} from "./components/gallery/artwork/ArtworkPage.tsx";
import {AnalyticsPage} from "./components/analytics/AnalyticsPage.tsx";
import {AboutMePage} from "./components/about/AboutMePage.tsx";
import {AboutPage} from "./components/lore/world/AboutPage.tsx";
import {CharactersPage} from "./components/lore/characters/CharactersPage.tsx";
import {TemplatedLorePage} from "./components/lore/characters/TemplatedLorePage.tsx";
import {AlcorWorldInfo} from "./components/lore/world/AlcorWorldInfo.tsx";
import {BioEnhancementIntro} from "./components/lore/world/BioEnhancementIntro.tsx";
import {AlcorOutfits} from "./components/lore/outfits/AlcorOutfits.tsx";
import {SomaInfo} from "./components/lore/characters/SomaInfo.tsx";
import {MinimalGalleryPage} from "./components/gallery/MinimalGalleryPage.tsx";
import React from "react";
import {Route, Routes} from "react-router-dom";

export function AppRouter() {
    return <Routes>
        <Route path="/" element={<LinksPage/>}/>
        <Route path="gallery">
            <Route index element={<Gallery/>}/>
            <Route path=":id" element={<ArtworkPage/>}/>
        </Route>

        <Route path="/analytics" element={<AnalyticsPage/>}/>
        <Route path="/about" element={<AboutMePage/>}/>

        <Route path="/lore" element={<AboutPage/>}>
            <Route index element={<CharactersPage/>}/>
            <Route path=":character" element={<TemplatedLorePage/>}/>
            <Route path="world" element={<AlcorWorldInfo/>}/>
            <Route path="bio-enhancement" element={<BioEnhancementIntro/>}/>
            <Route path="outfits" element={<AlcorOutfits/>}/>
            <Route path="soma" element={<SomaInfo/>}/>
        </Route>

        <Route path="/reference" element={<MinimalGalleryPage/>}/>
    </Routes>;
}