import {IconButton, ImageList, ImageListItem, ImageListItemBar,} from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import {ArtTag, ImageData} from "./ImageData";

export function CharacterImageGrid() {
    const itemData: ImageData[] = [
        {
            img: "https://pbs.twimg.com/media/FTkSbIYaQAALr_G?format=jpg&name=large",
            title: "Awakened Workout",
            source: "https://twitter.com/purpledragonrei/status/1529275140957437954?s=20&t=IQ_4HE6QZFQn8s7KgKDGqQ",
            author: "@PurpleDragonRei",
            rows: 5,
            cols: 2,
        },
        {
            img: "https://pbs.twimg.com/media/FTfg_0eVIAADZpm?format=jpg&name=large",
            title: "Symbiotic Form",
            source: "https://twitter.com/AmpedDragon/status/1528938543912873984?s=20",
            author: "@AmpedDragon",
            rows: 2,
            cols: 2,
            tags: [
                ArtTag.aicore
            ]
        },
        {
            img: "https://pbs.twimg.com/media/FOBdASRWYAYYG_b?format=jpg&name=4096x4096",
            title: "Cafe Superhero",
            source: "https://twitter.com/FaintAlcor/status/1504306403208486912?s=20&t=zA57hIGuprCpbPwSIW7YJg",
            author: "@graysheartart",
            rows: 3,
            cols: 2,
            tags: [
                ArtTag.superhero
            ]
        },
        {
            img: "https://pbs.twimg.com/media/FQbUBrTWUAEToWA?format=jpg&name=4096x4096",
            title: "Beach Boy",
            source: "https://twitter.com/FaintAlcor/status/1515132564297732096?s=20&t=SWiTBSL9DioRcYH7ZyfJ0w",
            author: "@KuroPenguinEx",
            cols: 2,
            rows: 2,
        },
        {
            img: "https://pbs.twimg.com/media/FR1aITDaQAYRo9N?format=jpg&name=large",
            title: "Beefy Kitty",
            source: "https://twitter.com/MecinKari/status/1521471592957878272?s=20&t=syJL8C_z2-7PhOHaCLOHDA",
            author: "@MecinKari",
            rows: 2,
            cols: 2,
        },
        {
            img: "https://pbs.twimg.com/media/FS3TACVVsAAQPl1?format=jpg&name=large",
            title: "Kayztor Gift Art",
            source: "https://twitter.com/kayztorOfficial/status/1526107849192898560?s=20&t=QLqlZ2NIWijqBI-1VnVryA",
            author: "@kayztorOfficial",
            cols: 2,
            rows: 1,
        }
    ];
    return (
        <ImageList variant="quilted" cols={6}>
            {itemData.map(
                ({cols = 1, img, rows = 1, title, author, source, artistURL}) => {
                    let linkProps = {};
                    if (artistURL) {
                        linkProps = {
                            target: "noreferrer noopener",
                            href: artistURL,
                        };
                    }
                    else if (author) {
                        linkProps = {
                            target: "noreferrer noopener",
                            href: `https://twitter.com/${author.substring(1)}`,
                        };
                    }
                    return (
                        <ImageListItem key={img} cols={cols} rows={rows}>
                            <img
                                src={img}
                                alt={title}
                                loading={"lazy"}
                                onClick={() => window.open(source, "_blank")}
                                className={"artImage"}
                            />
                            <ImageListItemBar
                                subtitle={author}
                                actionIcon={
                                    <IconButton
                                        sx={{color: "rgba(255, 255, 255, 0.54)"}}
                                        aria-label={`info about ${title}`}
                                        {...linkProps}
                                    >
                                        <InfoIcon/>
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    );
                }
            )}
        </ImageList>
    );
}

