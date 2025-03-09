import React from "react";
import {Container, Divider, Grid, GridSize, IconButton, ImageList, ImageListItem, Table, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {PageHeader} from "../PageHeader";
import {SkeletonImage} from "../../SkeletonImage";
import {Radar} from 'react-chartjs-2';
import {Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip} from 'chart.js';
import {templatedLorePageInfo} from "./template-info/alcor-forms";
import {superheroSuits} from "./template-info/superhero-suits";
import {originalCharacters} from "./template-info/original-characters";
import {M3Pane} from "../../common/M3Pane.tsx";
import {ArrowBack} from "@mui/icons-material";
import {croppedImageWithCurvedBorder, m3BorderStyle} from "../../common/BorderStyling.ts";

// Register the components needed for the radar chart
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export type Affinity =
    'Fire'
    | 'Ice'
    | 'Electric'
    | 'Wind'
    | 'Water'
    | 'Stone'
    | 'Poison'
    | 'Burst'
    | 'Sound'
    | 'Light'
    | 'Darkness'
    | 'Gravity'
    | 'Kinesis'
    | 'Time';

type AttributeScores = [number, number, number, number, number, number];
type InfoTable = { tableHeader?: { header1: string, header2: string }, tableContents: Record<any, any> & { "Affinity"?: Affinity } };
export type FormInformation = {
    name: string,
    body: string,
    history?: string,
    thumbnail: string,
    image: string,
    link: string,
    description: string,
    imageAspectRatio: number,
    specs?: {
        xs?: GridSize,
        sm?: GridSize,
        md?: GridSize,
        lg?: GridSize,
        xl?: GridSize,
        content: (InfoTable | string | AttributeScores)
    }[],
    gallery?: (string | React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>)[]
};

function FormStatRadarChart(props: Readonly<{ attributeScores: AttributeScores, label: string }>) {
    // Data for the radar chart
    // TODO Integrate CSS variables somehow
    // TODO Allow multiple attribute scores
    const data = {
        labels: ['Attack', 'Defense', 'Speed', 'Precision', 'Range', 'Stamina'],
        datasets: [
            {
                label: props.label,
                data: props.attributeScores,
                backgroundColor: '#285fa133',
                borderColor: '#285fA1',
                borderWidth: 2,
                pointBackgroundColor: '#D5E3FF',
                pointBorderColor: '#000',
            }
        ]
    };

    // Options to control the scale and steps
    const options = {
        scales: {
            r: {
                min: 0, // Minimum value for the radar chart scale
                max: 7, // Maximum value for the radar chart scale
                // ticks: {
                //     stepSize: 1, // Step size for the radar chart ticks
                //     color: 'rgba(0, 0, 0, 0.5)', // Color of tick labels
                // },
                grid: {
                    color: '#c4c6cf', // Color of the radar chart grid
                },
                ticks: {
                    display: false // Hides the labels in the middel (numbers)
                }
            },
        },
    };

    return <div style={{...m3BorderStyle, background: 'var(--md-sys-color-surfaceContainerHighest)', display: 'flex', height: '100%', alignItems: 'center'}}><Radar data={data} options={options}/></div>;
}

export function TemplatedLorePage() {
    const formName = encodeURIComponent(useParams().character ?? "");
    const formObject = templatedLorePageInfo.concat(superheroSuits).concat(originalCharacters).find(value => value.link === formName);

    const navigate = useNavigate();

    function backToLorePage() {
        navigate({pathname: '/lore'});
    }

    if (formObject) {
        const {name, body, history, image, imageAspectRatio, specs, gallery} = formObject;
        return <M3Pane style={{display: "flex"}}>
            <IconButton onClick={backToLorePage} style={{alignSelf: 'flex-start'}}>
                <ArrowBack/>
            </IconButton>
            <Container>
                <PageHeader title={name}/>
                <Grid container spacing={'1rem'} justifyContent={"stretch"}>
                    <Grid item md={3}>
                        <SkeletonImage src={image} style={{...croppedImageWithCurvedBorder, height: '100%'}}/>
                    </Grid>
                    <Grid item md={9}>
                        <Typography variant={"h5"}>Overview</Typography>
                        <Typography variant={"body1"}>{body}</Typography>
                        <Typography variant={"h5"}>History</Typography>
                        <Typography>
                            {history}
                        </Typography>
                        {
                            specs && <>
                                <Divider style={{marginTop: "8px", marginBottom: "8px"}}/>
                                <Typography variant={"h5"} style={{marginBottom: 8}}>Specs</Typography>
                                <Grid container spacing={'1rem'} alignContent={'stretch'}>
                                    {specs?.map(value => {
                                        const {xl, md, lg, xs, sm, content} = value;
                                        const gridSizes = {xs: xs, sm: sm, md: md, lg: lg, xl: xl};
                                        if (typeof content === 'string') {
                                            // @ts-ignore
                                            return <Grid item {...gridSizes}>
                                                <img src={content} style={croppedImageWithCurvedBorder}/>
                                            </Grid>
                                        } else if (Array.isArray(content)) {
                                            // @ts-ignore
                                            return <Grid item {...gridSizes}><FormStatRadarChart label={name} attributeScores={content}/></Grid>
                                        } else {
                                            // @ts-ignore
                                            return <Grid item {...gridSizes}>
                                                <div style={{...m3BorderStyle, padding: 8, height: '100%'}}>
                                                    <Table size="small">
                                                        {content.tableHeader && <TableHead>
                                                            <TableRow>
                                                                <TableCell>{content.tableHeader.header1}</TableCell>
                                                                <TableCell>{content.tableHeader.header2}</TableCell>
                                                            </TableRow>
                                                        </TableHead>}
                                                        {
                                                            Object.entries(content.tableContents).map(entry => <TableRow>
                                                                <TableCell>{entry[0]}</TableCell>
                                                                <TableCell>{entry[1]}</TableCell>
                                                            </TableRow>)
                                                        }
                                                    </Table>
                                                </div>
                                            </Grid>
                                        }
                                    })}
                                </Grid>
                            </>
                        }
                    </Grid>
                    <Grid item md={12}>
                        {
                            gallery && <>
                                <Divider style={{marginTop: "8px", marginBottom: "8px"}}/>
                                <Typography variant={"h5"} style={{marginBottom: 8}}>Gallery</Typography>
                                <ImageList variant="masonry" cols={4} gap={16}>
                                    {gallery.map((item) => {
                                        const src = typeof item === 'string' ? item : item.src;
                                        return (
                                            <ImageListItem key={src} cols={2}>
                                                {
                                                    typeof item === 'string' ? <img
                                                        src={src}
                                                        loading="lazy"
                                                        style={croppedImageWithCurvedBorder}
                                                    /> : <img {...item} />
                                                }
                                            </ImageListItem>
                                        );
                                    })}
                                </ImageList>
                            </>
                        }
                    </Grid>
                </Grid>
            </Container>
        </M3Pane>
    } else {
        // TODO Add error boundary
        return <></>
    }
}