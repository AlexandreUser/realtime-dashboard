import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts"
import ApexCharts from "apexcharts"
export default function(props) {
  let dates = props.timeSeries
  let datesLine = props.timeSeries
  const [selected,setSelected] = useState()
  useEffect(()=>{
    dates = props.timeSeries   
    datesLine = props.timeSeries
         

      if(selected && selected.xaxis){
     
        ApexCharts.exec('chart2', 'updateOptions', {
          xaxis: {
            ...selected.xaxis
          },
        });
      }
      
      
       
    },[props.timeSeries])
  

    let chartData = {
      
      series: dates,
      options: {
        markers: {
          size: 5,
        },
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        noData: {
          text: "Loading..."
        },
        toolbar: {
          autoSelected: 'zoom'
        },
        chart: {
          events: {
            zoomed: function (chartContext, options) {
              setSelected(options)
              console.log(options)
            }
          },
          foreColoer:"white",
          id: 'chart2',
          type: 'line',
          height: 230,
          toolbar: {
            autoSelected: 'pan',
            show: true
          }
        },
        
        stroke: {
          width: 3
        },
        dataLabels: {
          enabled: true
        },
        title: {
          text: 'Weight and positive value',
          align: 'left'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.8,
            opacityTo: 0.4,
            stops: [0, 90, 100]
          },
        },
      
        xaxis: {
          type: 'datetime'
        }
      },
    
      seriesLine: datesLine,
      optionsLine: {
        
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        }, toolbar: {
          autoSelected: 'zoom'
        },
        chart: {
          id: 'chart1',
          height: 130,
          type: 'area',
          brush:{
            target: 'chart2',
            enabled: true
          },
          selection: {
            enabled: true,
           
          },
          events: {
        
            brushScrolled: function (chartContext, options) {
              setSelected(options)
              console.log(options)
            }
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.8,
            opacityTo: 0.4,
            stops: [0, 90, 100]
          },
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: true
          }
        },
        yaxis: {
          title: {
            text: 'Value'
          },
        }
      },
    
      
    };
 


    return (
      

      <div id="wrapper">
        <div id="chart-line2">
          <ReactApexChart options={chartData.options} series={chartData.series} type="area"  height={350}  width={window.window.innerWidth-200}/>
        </div>
        <div id="chart-line">
          <ReactApexChart options={chartData.optionsLine} series={chartData.seriesLine} type="area" height={130}  width={window.window.innerWidth-200} />
        </div>
      </div>


    );
  }