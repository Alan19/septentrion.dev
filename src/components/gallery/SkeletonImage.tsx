import React, {useEffect, useState} from "react";
import {Skeleton} from "@mui/material";

export function SkeletonImage(props: { src: string, height: number }) {

    function checkIfImagesAreCached() {
        return new Promise(() => {
            const image = new Image();
            image.src = props.src;
            return image.complete;
        })
    }

    const [isReady, setIsReady] = useState(false);

    async function loadImage() {
        console.log("Loading all images");
        const promises = new Promise<void>((resolve) => {
            const img = new Image();
            img.src = props.src;
            img.onload = () => resolve();
        });

        return promises.then(() => console.log("All done"));
    }

    useEffect(() => {
        loadImage().then(() => {
            console.log("Flipping the switch!")
            // setIsReady(true);
        });
    }, [props.src]);

    return (
        <>{isReady ? <img
            src={props.src}
            loading={"lazy"}
            className={"artImage"}
        /> : <Skeleton variant={"rectangular"} style={{height: props.height, width: "200px"}}/>}</>
    );
}