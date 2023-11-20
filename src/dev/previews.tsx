import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {AlcorForms} from "../components/alcor-forms/AlcorForms";
import {Gallery} from "../components/gallery/Gallery";
import App from "../App";
import {LinksPage} from "../components/links/LinksPage";
import {AquariusForm} from "../components/alcor-forms/AquariusForm";
import {SiteAppBar} from "../SiteAppBar";

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
            <ComponentPreview path="/LinksPage">
                <LinksPage/>
            </ComponentPreview>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/AquariusForm">
                <AquariusForm/>
            </ComponentPreview>
            <ComponentPreview path="/SiteAppBar">
                <SiteAppBar/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;