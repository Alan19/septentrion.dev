import React, {memo, MouseEventHandler, useEffect, useState} from "react";
import {Fade, IconButton} from "@mui/material";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibraryOutlined";
import Skeleton from "react-loading-skeleton";

export const SkeletonImage = memo(function SkeletonImage(props: {
    src: string,
    onClick?: MouseEventHandler<HTMLImageElement>,
    style?: React.CSSProperties,
    hasAlts?: boolean,
    alt?: string,
    imageClassname?: string,
    href?: string,
    skeletonStyle?: React.CSSProperties,
    debugSkeleton?: boolean
}) {
    const {src, style, onClick, alt, skeletonStyle, imageClassname, href, debugSkeleton = false} = props;

    const [isReady, setIsReady] = useState(isImageCached());

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src]);

    if (isReady && !debugSkeleton) {
        const img = <img alt={alt} loading={"lazy"} className={imageClassname} onClick={onClick} style={{display: 'block', ...style}} src={src}/>;
        const renderedImage = href ? <a target={'_blank'} style={{height: 'min-content'}} href={href}>{img}</a> : img
        return <>
            {
                props.hasAlts &&
                <IconButton style={{
                    position: "absolute",
                    right: "8px",
                    top: "8px",
                    backgroundColor: "color-mix(in srgb, var(--md-sys-color-secondary) 80%, transparent)"
                }}>
                    <PhotoLibraryIcon/>
                </IconButton>
            }
            <Fade in>{renderedImage}</Fade>
        </>;
    } else {
        return <Skeleton style={skeletonStyle}/>;
    }
})