import {croppedImageWithCurvedBorder} from "../common/BorderStyling.ts";
import {SkeletonImage} from "../SkeletonImage.tsx";
import React from "react";
import {Link} from "react-router-dom";

export function GalleryImage(props: Readonly<{
    aspectRatio: number,
    doesImageHaveAlts: boolean,
    id: string,
    imageName: string,
    isSelected: boolean,
    onClickWhenTagging: () => void,
    searchParams: string,
    src: string,
    isTagging: boolean
}>) {
    const {isTagging, src, aspectRatio, onClickWhenTagging, imageName, doesImageHaveAlts, isSelected, id, searchParams} = props;
    const image = <SkeletonImage
        hasAlts={doesImageHaveAlts}
        alt={imageName}
        src={src}
        imageClassname={"artImage"}
        style={croppedImageWithCurvedBorder}
    />
    const taggingImage = <div onClick={onClickWhenTagging}
                              role={"button"}
                              style={{
                                  backgroundColor: isSelected ? "var(--md-sys-color-primaryContainer)" : 'initial',
                                  borderRadius: 8,
                                  overflow: "hidden",
                                  padding: isSelected ? 16 : 0,
                                  transition: "padding .2s ease",
                                  aspectRatio: aspectRatio
                              }}
                              key={imageName}>
        {image}
    </div>;
    const linkImage = <Link key={imageName} to={{pathname: id, search: searchParams}}>{image}</Link>;
    return isTagging ? taggingImage : linkImage;
}