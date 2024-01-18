import {Dialog, DialogContent, Divider, Grid, Typography, useMediaQuery} from "@mui/material";
import dayjs from "dayjs";
import React, {useState} from "react";
import {ImageInformation} from "../ImageInformation";
import {ImageWithLoadingSkeleton} from "./ImageWithLoadingSkeleton";
import "./gallery.css";
import {Button} from "@mui/material-next";
import Chip from "@mui/material-next/Chip";

export function GalleryDialog(props: {
    currentImage?: ImageInformation,
    closeModal: () => void,
    isOpen: boolean
}) {
    const [imageNumber, setImageNumber] = useState(0);
    const isPortrait = useMediaQuery('(orientation: portrait)');

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
        setImageNumber(index + 1);
        window.scrollTo(0, 0);
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
                                src={props.currentImage.webp ?? props.currentImage.src}
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
                    {props.currentImage?.alts && <>
                        <Divider style={{marginTop: "8px", marginBottom: "8px"}}/>
                        <Typography variant={"h5"}>Alts</Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={6} sm={4}><img
                                onClick={() => handleAltImageClick(0)}
                                style={{width: "100%"}}
                                src={props.currentImage.thumbnailUrl ?? props.currentImage.webp ?? props.currentImage.src}/></Grid>
                            {props.currentImage?.alts?.map((value, index) => <Grid item xs={6} sm={4}><img
                                onClick={() => handleAltImageClick(index)}
                                style={{width: "100%"}}
                                src={value.thumbnail ?? value.webp ?? value.src}/></Grid>)}
                        </Grid>
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
                </Grid>
            </Grid>
        </DialogContent>
    </Dialog>
}