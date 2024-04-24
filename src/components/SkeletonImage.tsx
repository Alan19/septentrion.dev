import React, {MouseEventHandler, useEffect, useState} from "react";
import {Skeleton} from "@mui/material";

export function SkeletonImage({src, aspectRatio, onClick}: { src: string, aspectRatio: number, onClick?: MouseEventHandler<HTMLImageElement> }) {
    const [isReady, setIsReady] = useState(false);

    function isImageCached() {
        const image = new Image();
        image.src = src;
        return image.complete;
    }

    async function loadImg() {
        setIsReady(isImageCached());
        return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
        });
    }

    useEffect(() => {
        loadImg().then(() => {
            setIsReady(true);
        });

    }, [src]);


    if (isReady) {
        return <img loading={"lazy"} onClick={onClick} style={{width: '100%', height: 'inherit'}} src={src}/>;
    } else {
        return <Skeleton animation={"wave"}
                         variant={"rounded"}
                         style={{aspectRatio: aspectRatio, width: "100%", height: 'auto'}}>
        </Skeleton>;
    }
}