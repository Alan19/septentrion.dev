import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {AlcorOutfits} from "../components/lore/outfits/AlcorOutfits";
import {BioEnhancementIntro} from "../components/lore/world/BioEnhancementIntro";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/about/outfits">
                <AlcorOutfits/>
            </ComponentPreview>
            <ComponentPreview path="/BioEnhancementIntro">
                <BioEnhancementIntro/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;