import {AltInformation, getAltAndPageNumber, getHref, getParentImage, isAltTypeComplex} from "../../../../api/src/images/ImageInformation.ts";
import {SkeletonImage} from "../../SkeletonImage";
import {Divider, Grid, IconButton, ImageList, ImageListItem, Typography, useMediaQuery} from "@mui/material";

import {Button} from "@mui/material-next";
import Chip from "@mui/material-next/Chip";
import dayjs from "dayjs";
import AltsUploader from "../AltsUploader";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {ArrowBack, ArrowOutward} from "@mui/icons-material";
import {useTagHooks} from "../UseTagHooks";
import {M3Pane} from "../../common/M3Pane";
import {materialDesign2Theme} from "../../../MaterialDesign2Theme.tsx";


export function ArtworkPage() {
    const imageId = encodeURIComponent(useParams().id ?? "");
    const {altData, imageEntries} = useTagHooks();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const searchParamString = searchParams.toString()
    const parentImageInfo = getParentImage(imageId, imageEntries);
    const currentImageInfo = imageEntries.find(value => value.id === imageId);

    const isMediumOrAbove = useMediaQuery(materialDesign2Theme.breakpoints.up("md"));

    function capitalizeFirstLetter(input: string) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }

    function sortAlts(a: AltInformation, b: AltInformation) {
        const {altNumber: altNumberA = 0, pageNumber: pageNumberA = 0} = getAltAndPageNumber(a);
        const {altNumber: altNumberB = 0, pageNumber: pageNumberB = 0} = getAltAndPageNumber(b);
        if (pageNumberA - pageNumberB !== 0) {
            return pageNumberA - pageNumberB;
        } else {
            return altNumberA - altNumberB;
        }
    }

    /**
     * Navigate back to the gallery page, and reuse the search param string
     * TODO Add share button to share link to page without search params
     */
    function goToPreviousPage() {
        navigate({pathname: '/gallery', search: searchParamString});
    }

    if (parentImageInfo && currentImageInfo) {
        const {webp, aspectRatio, href, tags, rating, characters} = currentImageInfo;
        const {artist, title, published, id, thumbnailUrl: parentThumbnail} = parentImageInfo;
        const altsInfo = altData.get(title);

        const imageHeight = isMediumOrAbove ? 'calc(100vh - 80px)' : 'fit-content';
        // TODO Clean up heights (maybe use 100% height by default and margins?)
        return (
            <Grid container spacing={'1rem'}>
                <Grid item md={9} xs={12} style={{display: 'flex', justifyContent: 'center', height: 'min-content'}}>
                    <M3Pane style={{width: '100%', ...(!isMediumOrAbove && {padding: 0})}} lastElement={false}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={'auto'}>
                                <IconButton onClick={() => goToPreviousPage()}>
                                    <ArrowBack/>
                                </IconButton>
                            </Grid>
                            <Grid item xs md style={{display: 'flex', justifyContent: 'center'}}>
                                <SkeletonImage href={href ?? parentImageInfo.href}
                                               style={{maxHeight: imageHeight, maxWidth: '100%', display: 'block'}}
                                               skeletonStyle={(aspectRatio ?? 1) < 1 ? {height: imageHeight, maxWidth: '100%'} : {maxHeight: imageHeight, width: '100%'}}
                                               src={webp}/>

                            </Grid>
                        </Grid>
                    </M3Pane>
                </Grid>
                <Grid item md={3} xs={12} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', gap: 8}}>
                    <M3Pane style={{...(!isMediumOrAbove && {paddingTop: 0, marginTop: 0})}}>
                        <>
                            <Typography style={{marginBottom: 8}} variant={"h4"}>{title}</Typography>
                            <Button color="primary"
                                    variant="outlined"
                                    target={"noreferrer noopener"}
                                    endIcon={<ArrowOutward/>}
                                    href={getHref(artist)}>
                                Artist: {artist}
                            </Button>
                            <Typography style={{marginTop: 24}} variant={"subtitle2"}>Tags</Typography>
                            <Grid style={{marginTop: "0"}} container direction={"row"} spacing={1}>
                                {tags?.sort((a, b) => a.localeCompare(b)).map((value) => (
                                    <Grid item>
                                        <Chip label={value} color={"primary"}/>
                                    </Grid>
                                ))}
                                <Grid item>
                                    <Chip label={capitalizeFirstLetter(rating)} color={"secondary"}/>
                                </Grid>
                                {characters?.map((value) => (
                                    <Grid item>
                                        <Chip label={value} color={"tertiary"}/>
                                    </Grid>
                                ))}
                            </Grid>
                            {altsInfo && <>
                                <Divider style={{marginTop: "8px", marginBottom: "8px"}}/>
                                <Typography variant={"h5"}>Original</Typography>
                                <ImageList cols={3}>
                                    <ImageListItem key={0}>
                                        <img
                                            style={{width: "100%"}}
                                            onClick={() => navigate({pathname: `/gallery/${id}`, search: searchParamString})}
                                            className={"dialog-image"}
                                            src={parentThumbnail}
                                            alt={title}/>
                                    </ImageListItem>
                                </ImageList>
                                {!!altsInfo?.filter(value => isAltTypeComplex(value.altType)).length && <>
                                    <Divider style={{marginTop: "8px", marginBottom: "8px"}}/>
                                    <Typography variant={"h5"}>Alts</Typography>
                                    <ImageList cols={3}>
                                        {altsInfo?.filter(value => isAltTypeComplex(value.altType)).sort((a, b) => sortAlts(a, b)).map((value, index) =>
                                            <ImageListItem key={index}>
                                                <img className={"dialog-image"}
                                                     onClick={() => navigate({pathname: `/gallery/${value.id}`, search: searchParamString})}
                                                     style={{width: "100%"}}
                                                     src={value.thumbnailUrl}/>
                                            </ImageListItem>)}
                                    </ImageList>
                                </>}
                                {!!altsInfo?.filter(value => !isAltTypeComplex(value.altType)).length && <>
                                    <Divider style={{marginTop: "8px", marginBottom: "8px"}}/>
                                    <Typography variant={"h5"}>Extras</Typography>
                                    <ImageList cols={3}>
                                        {altsInfo?.filter(value => !isAltTypeComplex(value.altType)).map((value, index) => <ImageListItem key={index}>
                                            <img
                                                className={"dialog-image"}
                                                onClick={() => navigate({pathname: `/gallery/${value.id}`, search: searchParamString})}
                                                style={{width: "100%"}}
                                                src={value.thumbnailUrl}/>
                                        </ImageListItem>)}
                                    </ImageList>
                                </>}
                            </>}
                            <Typography
                                variant={"subtitle1"}
                                style={{
                                    textAlign: "right",
                                    marginTop: 8
                                }}
                            >
                                {dayjs(published).format("MMM DD, YYYY")}
                            </Typography>
                        </>
                    </M3Pane>
                    <AltsUploader imageInformation={parentImageInfo} altCount={altsInfo?.length ?? 0}/>
                </Grid>
            </Grid>
        );
    } else {
        // TODO Add error boundary
    }
}