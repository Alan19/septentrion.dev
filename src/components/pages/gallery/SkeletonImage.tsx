import React, {memo, type MouseEventHandler, useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const SkeletonImage = memo(function SkeletonImage(props: {
    src: string,
    onClick?: MouseEventHandler<HTMLImageElement>,
    style?: React.CSSProperties,
    hasAlts?: boolean,
    alt?: string,
    imageClassname?: string,
    href?: string,
    skeletonStyle?: React.CSSProperties,
    debugSkeleton?: boolean,
    id: string
}) {
    const {src, style, onClick, alt, skeletonStyle, imageClassname, debugSkeleton = false} = props;

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
        // TODO Make Skeleton also navigate even when unloaded
        return <Link to={props.id} style={{display: "contents"}} className={"fade"}>
            {
                props.hasAlts && <button className="absolute circle secondary-container" style={{right: 8, top: 8, opacity: .75}}>
                    <i>more</i>
                </button>
            }
            <img alt={alt} loading={"lazy"} className={imageClassname} onClick={onClick} style={{display: 'block', ...style}} src={src}/>
        </Link>;
    } else {
        return <div style={{height: '100%', background: 'var(--surface-container)', borderRadius: 4, animation: 'skeleton-animation 2s ease-in-out 0.5s infinite', ...skeletonStyle}}/>;
    }
})