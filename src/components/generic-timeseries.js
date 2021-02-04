import { useEffect } from "react";
import ReactApexChart from "react-apexcharts"
import ApexCharts from "apexcharts"
export default function GenericChart(props){
    let dates = props.timeSeries

    useEffect(()=>{
        dates = props.timeSeries
        window.setInterval(() => {
           
            
            ApexCharts.exec('realtime', 'updateSeries', [{
              dates
            }])
          }, 1000)
    },[props.timeSeries])
    let data =  {
          
        series: dates,
        options: {
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                  speed: 1000
                }
              },
          chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
              type: 'x',
              enabled: true,
              autoScaleYaxis: true
            },
            toolbar: {
              autoSelected: 'zoom'
            }
          },
          dataLabels: {
            enabled: false
          },
          markers: {
            size: 0,
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
          yaxis: {
            labels: {
              formatter: function (val) {
                return (val )
              },
            },
            title: {
              text: 'Value'
            },
          },
          xaxis: {
            type: 'datetime',
          },
          tooltip: {
            shared: false,
            y: {
              formatter: function (val) {
                return (val )
              }
            }
          }
        },
      
      
      };
    
    
      return <div id="chart">
        <ReactApexChart options={data.options} series={data.series} type="area" height={350} width={window.window.innerWidth-200} />
        </div>
    }
     
 
