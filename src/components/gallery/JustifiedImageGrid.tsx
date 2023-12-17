import {ImageData} from "../ImageData";
import React, {useEffect, useState} from "react";
import {Skeleton} from "@mui/material";
// @ts-ignore
import JustifiedLayout from 'react-justified-layout';

export function JustifiedImageGrid(props: {
    images: ImageData[],
    width: number,
    onClick: (value: (ImageData | undefined)) => void
}) {
    const sources = props.images.map(value => value.thumbnailUrl ?? value.src);

    function checkIfImagesAreCached() {
        return sources.every(value => {
            const image = new Image();

            image.src = value;
            return image.complete;
        })
    }

    const [isReady, setIsReady] = useState(false);

    async function loadAll() {
        setIsReady(checkIfImagesAreCached())
        console.log("Loading all images");
        const promises = sources.map((source) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = source;
                // @ts-ignore
                img.onload = () => resolve();
            });
        });

        return Promise.all(promises).then(() => console.log("All done"));
    }

    useEffect(() => {
        loadAll().then(() => {
            console.log("Flipping the switch!")
            setIsReady(true);
        });
    }, [props.images]);

    return <JustifiedLayout containerWidth={props.width}>
        {props.images.map(value =>
            // @ts-ignore
            <div aspectRatio={value.aspectRatio}>
                {isReady ? <img
                    src={value.thumbnailUrl ?? value.src}
                    alt={value.title}
                    loading={"lazy"}
                    className={"artImage"}
                    onClick={() => props.onClick(value)}
                /> : <Skeleton variant={"rectangular"} style={{height: "100%"}}/>}

            </div>)}
    </JustifiedLayout>
}