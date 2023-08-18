import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  ImageList,
  ImageListItem,
  Modal,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ArtTag, ImageData } from "../ImageData";
import {
  CategoryOutlined,
  DryCleaningOutlined,
  Filter,
  PetsOutlined,
  Remove,
} from "@mui/icons-material";
import "./gallery.css";
import { theme } from "../../App";
import images from "./images.json";
import { useTagHooks } from "./UseTagHooks";

export type TagState = {
  [tag in ArtTag]: number;
};

export function Gallery() {
  const { getTags, setTags } = useTagHooks();
  const [currentImage, setCurrentImage] = useState<ImageData>();

  let tags: TagState = getTags();

  const enabledTags: ArtTag[] = Object.keys(tags).filter(
    (value) => tags[value as ArtTag] === 1
  ) as ArtTag[];
  const hiddenTags: ArtTag[] = Object.keys(tags).filter(
    (value) => tags[value as ArtTag] === -1
  ) as ArtTag[];

  function toggleHide(tagName: ArtTag) {
    if (tags[tagName] !== 1) {
      setTags({ ...tags, [tagName]: 1 });
    } else {
      setTags({ ...tags, [tagName]: 0 });
    }
  }

  function filterTag(tagName: ArtTag) {
    if (tags[tagName] !== -1) {
      setTags({ ...tags, [tagName]: -1 });
    } else {
      setTags({ ...tags, [tagName]: 0 });
    }
  }

  function filterCategories(
    element: JSX.Element,
    categoryName: string,
    filterFunction: (value: ArtTag) => boolean
  ) {
    function getColor(tag: ArtTag) {
      switch (tags[tag]) {
        case 1:
          return "primary";
        case -1:
          return "error";
        default:
          return "default";
      }
    }

    return (
      <>
        <Typography variant={"h6"} style={{ marginTop: "8px" }}>
          {element} {categoryName}
        </Typography>
        <Grid container direction={"row"} spacing={1}>
          {Object.values(ArtTag)
            .filter(filterFunction)
            .map((tag) => (
              <Grid item>
                <Chip
                  label={tag}
                  onClick={() => toggleHide(tag)}
                  variant={tags[tag] ? "filled" : "outlined"}
                  deleteIcon={<Remove />}
                  onDelete={() => filterTag(tag)}
                  color={getColor(tag)}
                />
              </Grid>
            ))}
        </Grid>
      </>
    );
  }

  const itemData: ImageData[] = images;
  let shownImages = itemData.filter((value) => {
    const hasFilterTag = enabledTags.some(
      (tag) => value.tags?.includes(tag) ?? false
    );
    const hasHiddenTag = hiddenTags.some(
      (tag) => value.tags?.includes(tag) ?? false
    );
    if (enabledTags.length === 0) {
      return !hasHiddenTag;
    } else {
      return hasFilterTag && !hasHiddenTag;
    }
  });
  const isSmallOrAbove = useMediaQuery(theme.breakpoints.up("sm"));
  const isMediumOrAbove = useMediaQuery(theme.breakpoints.up("md"));

  function getCols() {
    if (isMediumOrAbove) {
      return 4;
    } else if (isSmallOrAbove) {
      return 3;
    } else {
      return 1;
    }
  }

  return (
    <>
      <Modal
        open={!!currentImage}
        onClose={() => setCurrentImage(undefined)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            height: "80%",
            minWidth: "80%",
          }}
        >
          <Grid container style={{ height: "100%" }}>
            {currentImage && (
              <Grid
                item
                md={9}
                style={{
                  display: "flex",
                  backgroundColor: "black",
                  height: "100%",
                }}
                onClick={() => window.open(currentImage.href, "_blank")}
                className={"artImage"}
              >
                <img
                  src={currentImage.src}
                  alt={currentImage.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    alignSelf: "center",
                    margin: "auto",
                  }}
                  loading={"lazy"}
                />
              </Grid>
            )}
            <Grid item md={3}>
              <Typography>Extra text</Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <Paper
            elevation={3}
            className={`filters ${isMediumOrAbove ? "medium" : ""}`}
          >
            <Typography variant={"h5"} style={{ marginTop: "8px" }}>
              <Filter /> Filter Gallery
            </Typography>
            {filterCategories(<PetsOutlined />, "Forms", (value) =>
              value.includes("Form")
            )}
            {filterCategories(
              <DryCleaningOutlined />,
              "Superhero Suits",
              (value) => value.includes("Suit")
            )}
            {filterCategories(
              <CategoryOutlined />,
              "Miscellaneous",
              (value) =>
                !["Suit", "Form"].some((keyword) => value.includes(keyword))
            )}
          </Paper>
        </Grid>
        <Grid item md>
          <ImageList variant={"masonry"} cols={getCols()} gap={8}>
            {shownImages.map((value) => (
              <ImageListItem key={value.title}>
                <img
                  src={value.src}
                  alt={value.title}
                  loading={"lazy"}
                  onClick={() => setCurrentImage(value)}
                  className={"artImage"}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </>
  );
}
