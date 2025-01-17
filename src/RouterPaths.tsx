import {createHashRouter} from "react-router-dom";
import {Root} from "./Root";
import {Gallery} from "./components/gallery/Gallery";
import {ArtworkPage} from "./components/gallery/artwork/ArtworkPage";
import {AboutPage} from "./components/lore/world/AboutPage";
import {BioEnhancementIntro} from "./components/lore/world/BioEnhancementIntro";
import {AlcorOutfits} from "./components/lore/outfits/AlcorOutfits";
import {SomaInfo} from "./components/lore/characters/SomaInfo";
import React from "react";
import {AnalyticsPage} from "./components/analytics/AnalyticsPage";
import {MinimalGalleryPage} from "./components/gallery/MinimalGalleryPage";
import {CharactersPage} from "./components/lore/characters/CharactersPage";
import {AboutMePage} from "./components/about/AboutMePage";
import {TemplatedLorePage} from "./components/lore/characters/TemplatedLorePage";
import {AlcorWorldInfo} from "./components/lore/world/AlcorWorldInfo";

export const router = createHashRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path: "/gallery",
                children: [
                    {
                        index: true,
                        element: <Gallery/>
                    },
                    {
                        path: "/gallery/:id",
                        element: <ArtworkPage/>,
                    },
                ]
            },
            {
                path: '/analytics',
                element: <AnalyticsPage/>
            },

            {
                path: "/about",
                element: <AboutMePage/>,
            },
            {
                path: "/lore",
                element: <AboutPage/>,
                children: [
                    {
                        path: "/lore",
                        element: <CharactersPage/>,
                    },
                    {
                        path: "/lore/:character",
                        element: <TemplatedLorePage/>
                    },
                    {
                        path: "world",
                        element: <AlcorWorldInfo/>
                    },
                    {
                        path: 'bio-enhancement',
                        element: <BioEnhancementIntro/>
                    },
                    {
                        path: 'outfits',
                        element: <AlcorOutfits/>
                    },
                    {
                        path: 'soma',
                        element: <SomaInfo/>
                    }
                ]
            }
        ]
    },
    {
        path: "/reference",
        element: <MinimalGalleryPage/>
    }
]);