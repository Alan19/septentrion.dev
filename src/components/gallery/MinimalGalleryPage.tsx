import {useTagHooks} from "./useTagHooks.ts";
import {useNavigate} from "react-router-dom";
import {Container, Fade, Typography} from "@mui/material";
import {isImageInformation} from "../../../api/src/images/ImageInformation.ts";
import useMeasure from "react-use-measure";
import {ResizeObserver} from "@juggle/resize-observer";
import {drawerColor} from "../common/Navigation";
import {SkeletonImage} from "../SkeletonImage";
import {useAltDisplaySettings} from "./useAltDisplaySettings";
import {useDocumentTitle} from "usehooks-ts";
import {useQueryState} from "../../UseQueryState.tsx";
import {FilterMode, getShownImages, imageSort} from "./GalleryUtils.ts";
import {JustifiedGrid} from "react-justified-layout-ts";

// Page that only displays artworks in a grid, and hides all other elements
export function MinimalGalleryPage() {
    useDocumentTitle("Reference Gallery");
    const {filters, images, altData} = useTagHooks();

    const [filterMode] = useQueryState<FilterMode>("filter-mode", FilterMode.and);
    const [ref, bounds] = useMeasure({polyfill: ResizeObserver});
    const [referenceName] = useQueryState("reference-name", "Character Reference");
    const altDisplaySettings = useAltDisplaySettings();


    const navigation = useNavigate();
    const shownImages = getShownImages(images, filters, filterMode, altDisplaySettings).sort((a, b) => imageSort(a, b, images));

    const height = 350;
    return <Fade in>
        <Container maxWidth="xl" style={{display: "flex"}}>
            <div style={{
                background: drawerColor,
                borderRadius: 24,
                padding: 16,
                marginBottom: 16,
                marginTop: 16
            }}>
                <Typography variant={"h3"} fontFamily={"Potra"} color={"var(--md-sys-color-primary)"}>{referenceName}</Typography>
                <div ref={ref}></div>
                <div style={{display: "flex", flexDirection: "column", overflow: "hidden"}}>
                    <JustifiedGrid width={bounds.width}
                                       targetRowHeight={height}
                                       rowSpacing={8}
                                       itemSpacing={8}
                                       containerStyle={{position: "relative"}}
                                   aspectRatioList={shownImages.map(value => value.aspectRatio ?? 1)}>
                        {shownImages.map(value => {
                            const title = isImageInformation(value) ? value.title : value.parent;
                            return <SkeletonImage
                                onClick={() => navigation(`/gallery/${value.id}`)}
                                hasAlts={altData.has(title)}
                                alt={title}
                                src={value.thumbnailUrl ?? value.src}
                                imageClassname={"artImage"}/>;
                        })}
                    </JustifiedGrid>
                </div>
            </div>
        </Container>
    </Fade>;

}