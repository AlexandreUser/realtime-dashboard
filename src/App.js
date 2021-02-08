import logo from './logo.svg';
import './App.css';
import styles from "./styles/home.module.css"
import GenericGauge from "./components/generic-gauge"
import SimpleChart from "./components/generic-timeseries"
import BrushChart from "./components/generic-brush-timeseries"
import SyncChart from "./components/generic-sync-timeseries"

import { useState,useEffect } from 'react';
import { TimeSeries, Index } from "pondjs";
function App() {
  const [gauge1,setGauge1] = useState(0)
  const [gauge1Serie,setGauge1Serie] = useState([])
  const [gauge2Serie,setGauge2Serie] = useState([])

  const [gauge2,setGauge2] = useState(0)
  const [currentCount, setCount] = useState(10);
  const timer = () => setCount(currentCount - 1);
  const [chartSelected, setChartSelected] = useState(0)
  useEffect(
      () => {
          if (currentCount <= 0) {
              let gauge1Value = Math.random().toFixed(2)
              let gauge2Value = Math.random().toFixed(2)

              let newSerie2 = gauge2Serie

              newSerie2.push([
                new Date().toISOString()
                ,gauge2Value])
              setGauge2Serie(newSerie2)


              let newSerie1 = gauge1Serie
              newSerie1.push([
                new Date().toISOString()
                ,gauge1Value])
              setGauge1Serie(newSerie1)

              setGauge1(gauge1Value)
              setGauge2(gauge2Value)
              setCount(10)
          }
          const id = setInterval(timer, 500);
          return () => clearInterval(id);
      },
      [currentCount]
  );

  return (
    <div className="App">
      <header className="App-header">
        <div className={styles.gaugeContainer}>
          <div className={styles.gaugeHolder}>
            <GenericGauge arcs={[0.3, 0.2, 0.5]} 
            colorArcs={['#5BE12C', '#F5CD19', '#EA4228']} 
            percent={gauge1} 
            formatTextValue={(value)=>{return (parseInt(value)*100).toString()+' kg'}} />
            <p className={styles.gaugeLabel}>Weight of the package</p>
          </div>
          <div className={styles.gaugeHolder}>
            <GenericGauge arcs={[0.3, 0.5, 0.2]} colorArcs={['#5BE12C', '#F5CD19', '#EA4228']} percent={gauge2} />
            <p className={styles.gaugeLabel}>Percentage of something LoL</p>

          </div>
          <div className={styles.gaugeHolder}>
            <GenericGauge arcs={[0.7,  0.3]} 
            colorArcs={['#5BE12C', '#fc9803']} 
            percent={gauge1-gauge2>0?gauge1-gauge2:0} />
            <p className={styles.gaugeLabel}>A positive conversion of the first gauge - second gauge</p>

          </div>
        </div>
        <div className={styles.gaugeContainer}>
        <button className="buttonStyle" onClick={()=>{setChartSelected(0)}}>Simple chart</button>
        <button className="buttonStyle"  onClick={()=>{setChartSelected(1)}}>Brush chart</button>
        <button className="buttonStyle"  onClick={()=>{setChartSelected(2)}}>syncronized chart</button>

        </div>
        {chartSelected === 0 && 
         <SimpleChart timeSeries={[{
          name: 'Weight',
          type:"line",
          data: gauge1Serie.slice()
        },
        {
          name: 'Positive conversion',
          type:"area",
          data: gauge2Serie.slice()
        }]}/>
       
        }
        {chartSelected === 1 && 
          <BrushChart timeSeries={[{
            name: 'Weight',
            type:"line",
            data: gauge1Serie.slice()
          },
          {
            name: 'Positive conversion',
            type:"area",
            data: gauge2Serie.slice()
          }]}/>
        }
        {chartSelected === 2 && 
        <SyncChart timeSeries={[{
          name: 'Weight',
          type:"line",
          data: gauge1Serie.slice()
        },
        {
          name: 'Positive conversion',
          type:"area",
          data: gauge2Serie.slice()
        }]}
        
        />}
       
      </header>
    </div>
  );
}

export default App;
