import React, {MouseEventHandler, useEffect, useState} from "react";
import {Skeleton} from "@mui/material";

export function GalleryImage(props: {
    src: string,
    aspectRatio: number,
    style?: any,
    title: string,
    setCurrentImage: MouseEventHandler<HTMLImageElement>,
    className?: string
}) {
    const [isReady, setIsReady] = useState(false);

    function isImageCached() {
        const image = new Image();
        image.src = props.src;
        return image.complete;
    }

    async function loadImg() {
        setIsReady(isImageCached());
        return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = props.src;
            img.onload = () => resolve();
        });
    }

    useEffect(() => {
        loadImg().then(() => {
            setIsReady(true);
        });

    }, [props.src]);

    return isReady ?
        <img
            src={props.src}
            alt={props.title}
            loading={"lazy"}
            className={props.className}
            onClick={props.setCurrentImage}
            style={props.style}
        /> :
        <Skeleton variant={"rectangular"}
                  style={{aspectRatio: props.aspectRatio}}
                  height={"100%"}/>
}