import React from "react";
import {Divider, Grid, GridSize, Table, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {PageHeader} from "../PageHeader";
import {SkeletonImage} from "../../SkeletonImage";
import {originalCharacters, superheroSuits, templatedLorePageInfo} from "./templated-lore-page-info";
import {Radar} from 'react-chartjs-2';
import {Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip} from 'chart.js';

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
    }[]
};

export const m3BorderStyle = {borderRadius: 28, border: 'var(--md-sys-color-outlineVariant) 2px solid'};

function FormStatRadarChart(props: { attributeScores: AttributeScores, label: string }) {
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
                max: 5, // Maximum value for the radar chart scale
                ticks: {
                    stepSize: 1, // Step size for the radar chart ticks
                    color: 'rgba(0, 0, 0, 0.5)', // Color of tick labels
                },
                grid: {
                    color: '#c4c6cf', // Color of the radar chart grid
                },
            }
        },
    };

    return <div style={{...m3BorderStyle, background: 'var(--md-sys-color-surfaceContainerHighest)', display: 'flex', height: '100%', alignItems: 'center'}}><Radar data={data} options={options}/></div>;
}

export const croppedImageWithCurvedBorder: React.CSSProperties = {objectFit: 'cover', width: '100%', height: '100%', backgroundColor: 'var(--md-sys-color-surfaceContainerHighest)', ...m3BorderStyle};

export function TemplatedLorePage() {
    const formName = encodeURIComponent(useParams().character ?? "");
    const formObject = templatedLorePageInfo.concat(superheroSuits).concat(originalCharacters).find(value => value.link === formName);
    if (formObject) {
        const {name, body, history, image, imageAspectRatio} = formObject;
        return <>
            <PageHeader title={name}/>
            <Grid container spacing={'1rem'} justifyContent={"stretch"}>
                <Grid item md={3}>
                    <SkeletonImage src={image} style={croppedImageWithCurvedBorder} aspectRatio={imageAspectRatio}/>
                </Grid>
                <Grid item md={9}>
                    <Typography variant={"h5"}>Overview</Typography>
                    <Typography variant={"body1"}>{body}</Typography>
                    <Typography variant={"h5"}>History</Typography>
                    <Typography>
                        {history}
                    </Typography>
                    <Divider style={{marginTop: "8px", marginBottom: "8px"}}/>
                    <Typography variant={"h5"} style={{marginBottom: 8}}>Specs</Typography>
                    <Grid container spacing={'1rem'} alignContent={'stretch'}>
                        {formObject.specs?.map(value => {
                            const {xl, md, lg, xs, sm, content} = value;
                            const gridSizes = {xs: xs, sm: sm, md: md, lg: lg, xl: xl};
                            if (typeof content === 'string') {
                                return <Grid item {...gridSizes}>
                                    <img src={content} style={croppedImageWithCurvedBorder}/>
                                </Grid>
                            } else if (Array.isArray(content)) {
                                return <Grid item {...gridSizes}><FormStatRadarChart label={name} attributeScores={content}/></Grid>
                            } else {
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
                </Grid>
            </Grid>
        </>
    } else {
        // TODO Add error boundary
        return <></>
    }
}