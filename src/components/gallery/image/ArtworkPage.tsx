import {AltInformation, ImageInformation} from "../../ImageInformation";
import {SkeletonImage} from "../../SkeletonImage";
import {Container, Divider, Fade, Grid, IconButton, ImageList, ImageListItem, Typography} from "@mui/material";
import React, {useState} from "react";
import {Button} from "@mui/material-next";
import Chip from "@mui/material-next/Chip";
import dayjs from "dayjs";
import AltsUploader from "../AltsUploader";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import {drawerColor} from "../../navigation/NavigationRail";
import {useTagHooks} from "../UseTagHooks";

export function convertToSnakeCase(str: string) {
    // @ts-ignore
    return str && str.match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(s => s.toLowerCase())
        .join('_');
}

export function ArtworkPage() {
    const [imageTitle, setImageTitle] = useSearchParams();
    const {images, altData} = useTagHooks();
    const [imageNumber, setImageNumber] = useState(-1);
    const navigate = useNavigate();

    function getCurrentImageInfo(currentImage: ImageInformation, altsInfo?: AltInformation[]): [string, string, number] {
        if (imageNumber !== -1 && altsInfo) {
            return [altsInfo[imageNumber].webp ?? altsInfo[imageNumber].src, altsInfo[imageNumber].href ?? "", altsInfo[imageNumber].aspectRatio ?? 1];
        } else {
            return [currentImage.webp ?? currentImage.src, currentImage.href, currentImage.aspectRatio ?? 1];
        }
    }

    function handleAltImageClick(index: number) {
        setImageNumber(index);
    }

    const imageInfo = images.find(value => convertToSnakeCase(value.title) === imageTitle.get("title"));
    if (imageInfo) {
        const {
            webp,
            published,
            src,
            aspectRatio,
            title,
            href,
            artist,
            artistURL,
            thumbnailUrl,
            tags
        } = imageInfo;
        const altsInfo = altData.get(title);

        const imageHeight = 'calc(100vh - 72px)';
        return (
            <Fade in>
                <Container style={{marginTop: 16, minHeight: 'calc(100vh - 56px - 32px)'}} maxWidth={"xl"}>
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBack/>
                    </IconButton>
                    <Grid container spacing={4} style={{height: '100%'}}>
                        <Grid item md={9} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                            <SkeletonImage href={href}
                                           style={{maxHeight: imageHeight, maxWidth: '100%', display: 'block'}}
                                           skeletonStyle={(aspectRatio ?? 1) < 1 ? {height: imageHeight, maxWidth: '100%'} : {maxHeight: imageHeight, width: '100%'}}
                                           src={getCurrentImageInfo(imageInfo, altsInfo)[0]}
                                           containerStyle={{height: 'min-content'}}
                                           aspectRatio={getCurrentImageInfo(imageInfo, altsInfo)[2]}/>
                        </Grid>
                        <Grid item md={3} xs={12} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', gap: 8}}>
                            <div style={{
                                borderRadius: 24,
                                background: drawerColor,
                                padding: 16
                            }}>
                                <Typography style={{marginBottom: 8}} variant={"h4"}>{title}</Typography>
                                <Button color="primary"
                                        variant="outlined"
                                        target={"noreferrer noopener"}
                                        href={`https://twitter.com/${artist?.substring(1)}`}>
                                    Artist: {artist}
                                </Button>
                                <Typography style={{marginTop: 24}} variant={"subtitle2"}>Tags</Typography>
                                <Grid style={{marginTop: "0"}} container direction={"row"} spacing={1}>
                                    {tags?.map((value) => (
                                        <Grid item>
                                            <Chip label={value}/>
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
                            </div>
                            <AltsUploader imageInformation={imageInfo} altCount={altsInfo?.length ?? 0}/>
                        </Grid>
                    </Grid>
                </Container>
            </Fade>
        );
    } else {
        // TODO Add error boundary
    }
}