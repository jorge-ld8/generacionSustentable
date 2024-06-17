import { Bar, Doughnut } from "react-chartjs-2";
import { BLUE, ORANGE, YELLOW, VIOLET, actionTypes, GREEN, PINK, ULTRALIGHTBLUE, LIGHTBLUE, ULTRALIGHTVIOLET, LIGHTVIOLET } from "../lib/constants";
import Zonasnav from "./zonasnav";
import ProgressBar from "@ramonak/react-progress-bar";


export default function GenChartZone({name, iniNum, total, totalActionTypes, totalGenders,totalPobs}){
  let options = {
    tooltips: {
        enabled: false,
        callbacks: {
          label: function(tooltipItem, data) {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const total = dataset.data.reduce((a, b) => a + b, 0);
            const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            const percentage = Math.floor((value / total) * 100);
    
            return `${dataset.label}: ${percentage}%`;
          }
        }
    },
    plugins: {
        datalabels: {
            formatter: (value, ctx) => {
                console.log(ctx);
                const datapoints = ctx.chart.data.datasets[0].data
                const total = datapoints.reduce((total, datapoint) => total + datapoint, 0)
                const percentage = value / total * 100
                if (percentage < 5){
                  return percentage > 0 ?  " "+percentage.toFixed(0)+"%" : null;
                }
                return percentage > 0 ? percentage.toFixed(1) + "%" : null;
            },
            color: '#fff',
            backgroundColor: "#000",
        }
    }
  };
          // create a variable for the sum and initialize it
          let sumP = 0;

          // calculate sum using forEach() method
          total.totalParticipantes.forEach( num => {
              sumP += num;
          })
  
          // create a variable for the sum and initialize it
          let sum16_29 = 0;
  
          // calculate sum using forEach() method
          total.total1629.forEach( num => {
              sum16_29 += num;
          });

                  // create a variable for the sum and initialize it
        let sum_lid_16_29 = 0;

        // calculate sum using forEach() method
        total.totallid1629.forEach( num => {
            sum_lid_16_29 += num;
        });

    return (
            <div style={{padding: "0 60px"}}>
                <h2>Apuestas Formativas</h2>
                <Zonasnav/>
                <h3>Localidad: {name}</h3>
                <br />
                <p>
                    Número de iniciativas: {iniNum}
                </p>
                <br />
                <h4>
                    Número de jóvenes 16-29 años
                </h4>
                <br />
                <ProgressBar 
                    completed= {`${sum16_29}`}
                    bgColor="#a7cb45"
                    labelAlignment="center"
                    labelColor="#ffffff"
                    labelSize="16px"
                    maxCompleted={sumP}
                />
                <br />
                <h4>
                    Número de líderes jóvenes 16-29 años
                </h4>
                <br />
                <ProgressBar 
                    completed= {`${sum_lid_16_29}`}
                    bgColor="#f4c2c2"
                    labelAlignment="center"
                    labelColor="#ffffff"
                    labelSize="14px"
                    maxCompleted={sum16_29}
                />
                <br />
                <br />
                <h4>Resumen general</h4>
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                <div className="chart-container">
                    <Bar datasetIdKey='id' data={{
                        labels: actionTypes,
                        datasets:[{
                            // id: 1,
                            label: 'LGBTIQ',
                            backgroundColor: ORANGE,
                            data: total.totalLGBT,
                            }]
                        }} style={{display:"inline-block"}} options={{ maintainAspectRatio: true }}/>
                </div>
                <div className="chart-container">
                    <Bar datasetIdKey='id' data={{
                    labels: actionTypes,
                    datasets:[{
                        // id: 2,
                        label: 'Mujeres',
                        backgroundColor: BLUE,
                        data: total.totalMujeres,
                        }]
                    }} style={{display:"inline-block"}}  options={{ maintainAspectRatio: true }}/>
                </div>
                <div className="chart-container">
                    <Bar datasetIdKey='id' data={{
                    labels: actionTypes,
                    datasets:[{
                        // id: 3,
                        label: 'Indigena',
                        backgroundColor: GREEN,
                        data: total.totalInd,
                        }]
                    }} style={{display:"inline-block"}}  options={{ maintainAspectRatio: true }}/>
                </div>
                <div className="chart-container">
                    <Bar datasetIdKey='id' data={{
                    labels: actionTypes,
                    datasets:[{
                        // id: 4,
                        label: 'Participantes',
                        backgroundColor: VIOLET,
                        data: total.totalParticipantes,
                        }]
                    }} style={{display:"inline-block"}}  options={{ maintainAspectRatio: true }}/>
                </div>
                <div className="chart-container">
                <Bar datasetIdKey='id' data={{
                    labels: actionTypes,
                    datasets:[{
                        // id: 5,
                        label: 'Rural',
                        backgroundColor: YELLOW,
                        data: total.totalRural,
                      }]}} style={{display:"inline-block"}}  options={{ maintainAspectRatio: true }}/>
                </div>
                <div className="chart-container">
                <Doughnut data={{labels:actionTypes, datasets: [{
                        // id: 1,
                        label: '# iniciativas',
                        backgroundColor: [ORANGE, BLUE, GREEN, VIOLET],
                        data: totalActionTypes,
                }]}} options={options} />
                </div>
                <br />
                <br />
                <div className="chart-container">
                <h4>Resumen por género</h4>
                <Doughnut data={{labels:["mujeres", "hombres", "LGBTIQ+", "NI"], datasets: [{
                        // id: 1,
                        label: '# participantes',
                        backgroundColor: [VIOLET, BLUE, GREEN, ORANGE],
                        data: totalGenders,
                }]}} options={options} />
                </div>
                <div className="chart-container">
                <h4>Resumen por tipo de población</h4>
                <Doughnut data={{labels:["urbana", "indígena", "rural"], datasets: [{
                        // id: 1,
                        label: '# participantes',
                        backgroundColor: [BLUE, ORANGE, GREEN],
                        data: totalPobs,
                }]}} options={options} />
                </div>
        </div>
                <br />
                <h4>Comparación General</h4>
                <br />
                <Bar datasetIdKey='id' data={{
                labels: actionTypes,
                datasets:[
                  {
                    // id: 3,
                    label: 'Indígena',
                    backgroundColor: ULTRALIGHTBLUE,
                    data: total.totalInd,
                  },
                  {
                    // id: 4,
                    label: 'Rural',
                    backgroundColor: LIGHTBLUE,
                    data: total.totalRural,
                  },
                  {
                    label: 'Urbana',
                    backgroundColor: BLUE,
                    data: total.totalParticipantes.map((x, index)=>{return x-total.totalRural[index]-total.totalInd[index]}),
                  },
                  { 
                  // id: 1,
                  label: 'LGBTIQ',
                  backgroundColor: ULTRALIGHTVIOLET,
                  data: total.totalLGBT,
                  },
                {
                  // id: 2,
                  label: 'Mujeres',
                  backgroundColor: LIGHTVIOLET,
                  data: total.totalMujeres,
                },
                {
                  // id: 2
                  label: 'Hombres',
                  backgroundColor: VIOLET,
                  data: total.totalParticipantes.map((x, index)=>{return x-total.totalMujeres[index]-total.totalNoId[index]-total.totalLGBT[index]}),
                },
                {
                  // id: 5,
                  label: 'Participantes',
                  backgroundColor: YELLOW,
                  data: total.totalParticipantes,
                }
            ]
          }} style={{display:"inline-block"}} />
    </div>
    );
}