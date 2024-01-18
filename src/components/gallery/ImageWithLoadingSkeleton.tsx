import React, {useEffect, useState} from "react";
import {Skeleton} from "@mui/material";

export function ImageWithLoadingSkeleton(props: {
    children: React.JSX.Element,
    aspectRatio: number,
    href: string,
    isPortrait: boolean
}) {
    const [isReady, setIsReady] = useState(false);

    const {src} = props.children.props;

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
        return <a href={props.href !== '' ? props.href : props.children.props.src}
                  target={"_blank"}
                  style={{width: "100%", display: "flex", backgroundColor: "black"}}>
            {props.children}
        </a>;
    } else {
        // TODO Have it adapt to any height
        return <Skeleton animation={"wave"}
                         style={{aspectRatio: props.aspectRatio}}
                         height={props.isPortrait ? "inherit" : "90vh"}
                         width={"100%"}
                         variant={"rounded"}/>;
    }
}