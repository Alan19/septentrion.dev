import {createHashRouter} from "react-router-dom";
import {Root} from "./Root";
import {Gallery} from "./components/gallery/Gallery";
import {ArtworkPage} from "./components/gallery/image/ArtworkPage";
import {AboutPage} from "./components/about/AboutPage";
import {alcorForms, superheroSuits} from "./components/about/about-resources/alcorForms";
import {FormPage} from "./components/about/FormPage";
import {AlcorWorldInfo} from "./components/about/AlcorWorldInfo";
import {BioEnhancementIntro} from "./components/about/BioEnhancementIntro";
import {AlcorOutfits} from "./components/about/outfits/AlcorOutfits";
import {SomaInfo} from "./components/about/characters/SomaInfo";
import React from "react";
import {ArtworkOnlyPage} from "./components/gallery/ArtworkOnlyPage";

export const router = createHashRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path: "/gallery",
                element: <Gallery/>
            },
            {
                path: "/artwork",
                element: <ArtworkPage/>
            },
            {
                path: "about",
                element: <AboutPage/>,
                children: [
                    ...alcorForms.concat(superheroSuits).map(value => ({
                        path: `${value.link}`,
                        element: <FormPage formInformation={value}/>
                    })),
                    {
                        path: '',
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
        element: <ArtworkOnlyPage/>
    }
]);