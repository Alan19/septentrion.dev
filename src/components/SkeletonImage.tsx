import React, {memo, MouseEventHandler, useEffect, useState} from "react";
import {IconButton, Skeleton} from "@mui/material";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibraryOutlined";

export const SkeletonImage = memo(function SkeletonImage(props: {
    src: string,
    aspectRatio: number,
    onClick?: MouseEventHandler<HTMLImageElement>,
    style?: React.CSSProperties,
    containerStyle?: React.CSSProperties,
    hasAlts?: boolean,
    alt?: string,
    imageClassname?: string,
    href?: string
}) {
    const {src, aspectRatio, style, onClick, hasAlts = false, alt, imageClassname, containerStyle, href} = props;

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

    }, [src]);


    if (isReady) {
        const img = <img alt={alt} loading={"lazy"} className={imageClassname} onClick={onClick} style={{height: 'auto', ...style, width: '100%'}} src={src}/>;
        return <div style={containerStyle}>
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
            {href ? <a target={'_blank'} href={href}>{img}</a> : img}
        </div>;
    } else {
        return <div style={{width: "100%", aspectRatio: aspectRatio, ...style}}><Skeleton width={'100%'} height={'100%'} animation={"wave"} variant={"rounded"}/></div>;
    }
})