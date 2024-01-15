import {Button, Chip, Dialog, DialogContent, Grid, Typography, useMediaQuery} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import {ImageInformation} from "../ImageInformation";
import {ImageWithLoadingSkeleton} from "./ImageWithLoadingSkeleton";
import "./gallery.css";

export function GalleryDialog(props: {
    currentImage?: ImageInformation,
    closeModal: () => void,
    isOpen: boolean
}) {
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
    return <Dialog
        open={props.isOpen}
        onClose={props.closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth={true}
        maxWidth={"xl"}
    >
        <DialogContent>
            <Grid container direction={isPortrait ? 'column' : 'row'} spacing={2}>
                {props.currentImage && (
                    <Grid
                        item
                        md={8}
                        sm={7}
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
                                    height: isPortrait ? "inherit" : "70vh",
                                    alignSelf: "center",
                                    margin: "auto",
                                    objectFit: "contain"
                                }}
                                loading={"lazy"}
                            />
                        </ImageWithLoadingSkeleton>
                    </Grid>
                )}
                <Grid item md={4} xs sm={5} style={{
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