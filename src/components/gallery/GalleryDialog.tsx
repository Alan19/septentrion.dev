import {Dialog, DialogContent, Divider, Grid, IconButton, ImageList, ImageListItem, Typography, useMediaQuery} from "@mui/material";
import dayjs from "dayjs";
import React, {memo, useEffect, useState} from "react";
import {AltInformation, ImageInformation} from "../ImageInformation";
import "./gallery.css";
import {Button} from "@mui/material-next";
import Chip from "@mui/material-next/Chip";
import AltsUploader from "./AltsUploader";
import {theme} from "../../App";
import {Close} from "@mui/icons-material";
import {SkeletonImage} from "../SkeletonImage";

// TODO Switch to full length dialog
export const GalleryDialog = memo(function GalleryDialog(props: {
    currentImage?: ImageInformation,
    closeModal: () => void,
    isOpen: boolean,
    alts?: AltInformation[]
}) {
    const [imageNumber, setImageNumber] = useState(-1);
    const isPortrait = useMediaQuery("(orientation: portrait)");

    useEffect(() => {
        setImageNumber(-1);
    }, [props.currentImage]);

    // Hacky workaround to make padding on borderless dialog look good
    const portraitPadding = {
        paddingLeft: 16 + 24,
        paddingRight: 24,
        paddingTop: 20,
        paddingBottom: 20
    };
    let landscapePadding = {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 20 + 16,
        paddingBottom: 20

    };

    function handleAltImageClick(index: number) {
        setImageNumber(index);
    }

    function getCurrentImageInfo(currentImage: ImageInformation): [string, string, number] {
        if (imageNumber !== -1 && props.alts) {
            return [props.alts[imageNumber].webp ?? props.alts[imageNumber].src, props.alts[imageNumber].href ?? "", props.alts[imageNumber].aspectRatio ?? 1];
        } else {
            return [currentImage.webp ?? currentImage.src, currentImage.href, currentImage.aspectRatio ?? 1];

        }
    }

    return <Dialog
        open={props.isOpen}
        onClose={props.closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth={true}
        className={"gallery-dialog"}
        maxWidth={"xl"}
        fullScreen={!useMediaQuery(theme.breakpoints.up("md"))}
    >
        <DialogContent>
            <IconButton
                edge="start"
                color="inherit"
                onClick={props.closeModal}
                aria-label="close"
                style={{position: "absolute", left: "16px", top: "8px", backgroundColor: "color-mix(in srgb, var(--md-sys-color-secondary) 80%, transparent)"}}
            >
                <Close/>
            </IconButton>
            <Grid container style={{minHeight: "100%"}} direction={isPortrait ? "column" : "row"} spacing={2}>
                {props.currentImage && (
                    <Grid item md={9} sm={8} xs={7}>
                        <SkeletonImage src={getCurrentImageInfo(props.currentImage)[0]}
                                       aspectRatio={getCurrentImageInfo(props.currentImage)[2]}
                                       containerStyle={{background: "black"}}
                                       style={{
                                           maxWidth: "100%",
                                           height: isPortrait ? "inherit" : "90vh",
                                           alignSelf: "center",
                                           margin: "auto",
                                           objectFit: "contain",
                                           verticalAlign: "middle"
                                       }}
                                       href={props.currentImage.href}
                        />
                    </Grid>
                )}
                <Grid item
                      md
                      sm
                      xs
                      style={{
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                          ...isPortrait ? portraitPadding : landscapePadding,
                          background: 'var(--md-sys-color-surface)'
                      }}
                      className={"dialog-description"}>
                    <div style={{marginBottom: 8}}>
                        <Typography variant={"h4"}>{props.currentImage?.title}</Typography>
                    </div>
                    <div style={{flex: 1}}>
                        <Button color="primary"
                                variant="outlined"
                                target={"noreferrer noopener"}
                                href={`https://twitter.com/${props.currentImage?.artist?.substring(1)}`}>
                            Artist: {props.currentImage?.artist}
                        </Button>
                        <Typography style={{marginTop: 24}} variant={"subtitle2"}>Tags</Typography>
                        <Grid style={{marginTop: "0"}} container direction={"row"} spacing={1}>
                            {props.currentImage?.tags?.map((value) => (
                                <Grid item>
                                    <Chip label={value}/>
                                </Grid>
                            ))}
                        </Grid>
                    </div>

                    {props.currentImage && props.alts && <>
                        <Divider style={{marginTop: "8px", marginBottom: "8px"}}/>
                        <Typography variant={"h5"}>Alts</Typography>
                        <ImageList cols={3}>
                            <ImageListItem key={0}>
                                <img
                                    onClick={() => handleAltImageClick(-1)}
                                    style={{width: "100%"}}
                                    className={"dialog-image"}
                                    src={props.currentImage.thumbnailUrl ?? props.currentImage.webp ?? props.currentImage.src}
                                    alt={props.currentImage.title}/>
                            </ImageListItem>
                            {props.alts?.map((value, index) => <ImageListItem key={index}> <img
                                onClick={() => handleAltImageClick(index)}
                                className={"dialog-image"}
                                style={{width: "100%"}}
                                src={value.thumbnailUrl ?? value.webp ?? value.src}/></ImageListItem>)}
                        </ImageList>
                    </>}
                    {props.currentImage?.published && (
                        <Typography
                            variant={"subtitle1"}
                            style={{
                                textAlign: "right"
                            }}
                        >
                            {dayjs(props.currentImage?.published).format("MMM DD, YYYY")}
                        </Typography>
                    )}
                    {props.currentImage &&
                        <AltsUploader imageInformation={props.currentImage} altCount={props.alts?.length ?? 0}/>}
                </Grid>
            </Grid>
        </DialogContent>
    </Dialog>;
});