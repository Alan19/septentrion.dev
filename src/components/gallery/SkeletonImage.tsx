import React, {type CSSProperties, type ReactNode, useEffect, useState} from "react";
import './skeleton.css'
export function SkeletonImage({children, debug = false, src, skeletonStyle}: Readonly<{ children: ReactNode, debug?: boolean, src: string, skeletonStyle: CSSProperties }>) {
    if (false && !debug) {
        // TODO Make Skeleton also navigate even when unloaded
        return children;
    } else {
        return <div style={{height: '100%', background: 'var(--surface-container)', borderRadius: 4, animation: 'skeleton-animation 2s ease-in-out 0.5s infinite', ...skeletonStyle}}/>;
    }
}