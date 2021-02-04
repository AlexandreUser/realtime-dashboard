import GaugeChart from 'react-gauge-chart'

export default function genericGauge(props){
    return <GaugeChart id="gauge-chart5"
    nrOfLevels={420}
    arcsLength={[...props.arcs]}
    colors={[...props.colorArcs]}
    percent={props.percent}
    arcPadding={0.02}
    formatTextValue={props.formatTextValue}
  />
}