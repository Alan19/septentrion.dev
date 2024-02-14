import React, {MouseEventHandler, useEffect, useState} from "react";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibraryOutlined';
import {Skeleton} from "@mui/material";

export function GalleryImage(props: {
    src: string,
    aspectRatio: number,
    style?: any,
    title: string,
    setCurrentImage: MouseEventHandler<HTMLImageElement>,
    className?: string,
    hasAlts: boolean
}) {
    const [isReady, setIsReady] = useState(isImageCached());

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
        <div style={{position: "relative"}}>
            {
                props.hasAlts && <PhotoLibraryIcon style={{
                    position: "absolute",
                    right: "8px",
                    top: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    borderRadius: "8px"
                }}/>
            }

            <img
                src={props.src}
                alt={props.title}
                loading={"lazy"}
                className={props.className}
                onClick={props.setCurrentImage}
                style={props.style}
            ></img></div> :
        <Skeleton variant={"rectangular"}
                  style={{aspectRatio: props.aspectRatio}}
                  height={"100%"}/>
}