import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {AlcorForms} from "../components/alcor-forms/AlcorForms";
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
            {/*<ComponentPreview path="/GalleryDialog">*/}
            {/*    <GalleryDialog closeModal={() => {*/}
            {/*    }} isOpen={true} currentImage={images[0]}/>*/}
            {/*</ComponentPreview>*/}
            {/*<ComponentPreview path="/ChronologicalGallery">*/}
            {/*    <ChronologicalGallery width={window.outerWidth} setCurrentImage={image => {*/}
            {/*    }} displayedImages={images}/>*/}
            {/*</ComponentPreview>*/}
        </Previews>
    );
};

export default ComponentPreviews;