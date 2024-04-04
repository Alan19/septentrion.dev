import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {AboutPage} from "../components/about/AboutPage";
import App from "../App";
import {LinksPage} from "../components/links/LinksPage";
import {AquariusForm} from "../components/about/AquariusForm";
import {Root} from "../Root";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/AboutPage">
                <AboutPage/>
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
                <Root/>
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