import React from "react";

export const m3BorderStyle = {borderRadius: 28, border: 'var(--md-sys-color-outlineVariant) 2px solid'};
export const croppedImageWithCurvedBorder: React.CSSProperties = {objectFit: 'cover', width: '100%', height: '100%', backgroundColor: 'var(--md-sys-color-surfaceContainerHighest)', ...m3BorderStyle};