import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {AlcorOutfits} from "../components/about/outfits/AlcorOutfits";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/about/outfits">
                <AlcorOutfits/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;