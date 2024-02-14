import {Dialog, DialogContent, Divider, Grid, ImageList, ImageListItem, Typography, useMediaQuery} from "@mui/material";
import dayjs from "dayjs";
import React, {useEffect, useState} from "react";
import {AltInformation, ImageInformation} from "../ImageInformation";
import {ImageWithLoadingSkeleton} from "./ImageWithLoadingSkeleton";
import "./gallery.css";
import {Button} from "@mui/material-next";
import Chip from "@mui/material-next/Chip";
import AltsUploader from "./AltsUploader";

export function GalleryDialog(props: {
    currentImage?: ImageInformation,
    closeModal: () => void,
    isOpen: boolean,
    alts?: AltInformation[]
}) {
    const [imageNumber, setImageNumber] = useState(-1);
    const isPortrait = useMediaQuery('(orientation: portrait)');

    useEffect(() => {
        setImageNumber(-1)
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

    function getSrc(currentImage: ImageInformation) {
        if (imageNumber === -1) {
            return currentImage.webp ?? currentImage.src;
        } else if (props.alts) {
            return props.alts[imageNumber].webp ?? props.alts[imageNumber].src;
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
    >
        <DialogContent>
            <Grid container direction={isPortrait ? 'column' : 'row'} spacing={2}>
                {props.currentImage && (
                    <Grid
                        item
                        sm={9}
                        xs
                    >
                        <ImageWithLoadingSkeleton isPortrait={isPortrait}
                                                  href={(props.currentImage.href && props.currentImage.href !== '') ? props.currentImage.href : props.currentImage.src}
                                                  aspectRatio={props.currentImage.aspectRatio ?? 1}>
                            <img
                                src={getSrc(props.currentImage)}
                                alt={props.currentImage.title}
                                style={{
                                    maxWidth: "100%",
                                    height: isPortrait ? "inherit" : "90vh",
                                    alignSelf: "center",
                                    margin: "auto",
                                    objectFit: "contain"
                                }}
                                loading={"lazy"}
                            />
                        </ImageWithLoadingSkeleton>

                    </Grid>
                )}
                <Grid item sm xs={"auto"} style={{
                    display: "flex",
                    flexDirection: "column",
                    ...isPortrait ? portraitPadding : landscapePadding
                }} className={"dialog-description"}>
                    <div>
                        <Typography variant={"h4"}>{props.currentImage?.title}</Typography>
                    </div>
                    <div style={{flex: 1}}>
                        <Button color="primary"
                                variant="outlined"
                                target={"noreferrer noopener"}
                                href={`https://twitter.com/${props.currentImage?.artist?.substring(1)}`}>
                            Artist: {props.currentImage?.artist}
                        </Button>
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
                                src={value.thumbnail ?? value.webp ?? value.src}/></ImageListItem>)}
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
    </Dialog>
}