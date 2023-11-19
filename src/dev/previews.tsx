import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {AlcorForms} from "../components/alcor-forms/AlcorForms";
import {Gallery} from "../components/gallery/Gallery";
import App from "../App";
import {Main} from "../components/Main";
import {AquariusForm} from "../components/alcor-forms/AquariusForm";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/AlcorForms">
                <AlcorForms/>
            </ComponentPreview>
            <ComponentPreview path="/Gallery">
                <Gallery/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/Main">
                <Main/>
            </ComponentPreview>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/AquariusForm">
                <AquariusForm/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;