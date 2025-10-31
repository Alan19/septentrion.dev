import React, {type CSSProperties, type ReactNode, useEffect, useState} from "react";

export function SkeletonImage({children, debug = false, src, skeletonStyle}: { children: ReactNode, debug?: boolean, src: string, skeletonStyle: CSSProperties }) {
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

    if (isReady && !debug) {
        // TODO Make Skeleton also navigate even when unloaded
        return children;
    } else {
        return <div style={{height: '100%', background: 'var(--surface-container)', borderRadius: 4, animation: 'skeleton-animation 2s ease-in-out 0.5s infinite', ...skeletonStyle}}/>;
    }
}