import {AltInformation, getHref, ImageInformation} from "../../ImageInformation";
import {SkeletonImage} from "../../SkeletonImage";
import {Divider, Grid, IconButton, ImageList, ImageListItem, Typography, useMediaQuery} from "@mui/material";
import React, {useState} from "react";
import {Button} from "@mui/material-next";
import Chip from "@mui/material-next/Chip";
import dayjs from "dayjs";
import AltsUploader from "../AltsUploader";
import {useNavigate, useParams} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import {useTagHooks} from "../UseTagHooks";
import {prepareFileName} from "../Utils";
import {M3Pane} from "../../common/M3Pane";
import {theme} from "../../../App";

export function ArtworkPage() {
    const imageTitle = encodeURIComponent(useParams().title ?? "");
    const {images, altData} = useTagHooks();
    const [imageNumber, setImageNumber] = useState(-1);
    const navigate = useNavigate();

    function getCurrentImageInfo(currentImage: ImageInformation, altsInfo?: AltInformation[]): [string, string, number] {
        if (imageNumber !== -1 && altsInfo) {
            return [altsInfo[imageNumber].webp ?? altsInfo[imageNumber].src, altsInfo[imageNumber].href ?? "", altsInfo[imageNumber].aspectRatio ?? 1];
        } else {
            return [currentImage.webp ?? currentImage.src, currentImage.href ?? "", currentImage.aspectRatio ?? 1];
        }
    }

    function handleAltImageClick(index: number) {
        setImageNumber(index);
    }

    const imageInfo = images.find(value => prepareFileName(value.title) === imageTitle);
    const isMediumOrAbove = useMediaQuery(theme.breakpoints.up("md"));

    function capitalizeFirstLetter(input: string) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }

    if (imageInfo) {
        const {
            webp,
            published,
            src,
            aspectRatio,
            title,
            href,
            artist,
            thumbnailUrl,
            tags,
            rating,
            characters
        } = imageInfo;
        const altsInfo = altData.get(title);

        const imageHeight = isMediumOrAbove ? 'calc(100vh - 80px)' : 'fit-content';
        // TODO Clean up heights (maybe use 100% height by default and margins?)
        return (
            <Grid container spacing={'1rem'}>
                <Grid item md={9} xs={12} style={{display: 'flex', justifyContent: 'center', height: 'min-content'}}>
                    <M3Pane style={{width: '100%', ...(!isMediumOrAbove && {padding: 0})}} lastElement={false}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={'auto'}>
                                <IconButton onClick={() => navigate(-1)}>
                                    <ArrowBack/>
                                </IconButton>
                            </Grid>
                            <Grid item xs md style={{display: 'flex', justifyContent: 'center'}}>
                                <SkeletonImage href={href}
                                               style={{maxHeight: imageHeight, maxWidth: '100%', display: 'block'}}
                                               skeletonStyle={(aspectRatio ?? 1) < 1 ? {height: imageHeight, maxWidth: '100%'} : {maxHeight: imageHeight, width: '100%'}}
                                               src={getCurrentImageInfo(imageInfo, altsInfo)[0]}
                                               containerStyle={{height: 'min-content'}}
                                               aspectRatio={getCurrentImageInfo(imageInfo, altsInfo)[2]}/>

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
                                    href={getHref(artist)}>
                                Artist: {artist}
                            </Button>
                            <Typography style={{marginTop: 24}} variant={"subtitle2"}>Tags</Typography>
                            <Grid style={{marginTop: "0"}} container direction={"row"} spacing={1}>
                                {tags?.map((value) => (
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
                                <Typography variant={"h5"}>Alts</Typography>
                                <ImageList cols={3}>
                                    <ImageListItem key={0}>
                                        <img
                                            onClick={() => handleAltImageClick(-1)}
                                            style={{width: "100%"}}
                                            className={"dialog-image"}
                                            src={thumbnailUrl ?? webp ?? src}
                                            alt={title}/>
                                    </ImageListItem>
                                    {altsInfo?.map((value, index) => <ImageListItem key={index}> <img
                                        onClick={() => handleAltImageClick(index)}
                                        className={"dialog-image"}
                                        style={{width: "100%"}}
                                        src={value.thumbnailUrl ?? value.webp ?? value.src}/></ImageListItem>)}
                                </ImageList>
                            </>}
                            {published && (
                                <Typography
                                    variant={"subtitle1"}
                                    style={{
                                        textAlign: "right"
                                    }}
                                >
                                    {dayjs(published).format("MMM DD, YYYY")}
                                </Typography>
                            )}
                        </>
                    </M3Pane>
                    <AltsUploader imageInformation={imageInfo} altCount={altsInfo?.length ?? 0}/>
                </Grid>
            </Grid>
        );
    } else {
        // TODO Add error boundary
    }
}