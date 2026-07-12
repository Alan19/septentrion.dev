import ReactDOMServer from "react-dom/server";

export function galleryImageToString(src: string, alt?: string): string {
    return ReactDOMServer.renderToString(<img src={src} alt={alt} />);
}