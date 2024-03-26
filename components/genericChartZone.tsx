import { Bar, Doughnut } from "react-chartjs-2";
import { BLUE, ORANGE, YELLOW, VIOLET, actionTypes, GREEN } from "../lib/constants";
import Zonasnav from "./zonasnav";


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
    return (
            <div>
                <h2>Apuestas Formativas</h2>
                <Zonasnav/>
                <h3>Localidad: {name}</h3>
                <br />
                <p>
                    Número de iniciativas: {iniNum}
                </p>
                <br />
                <h4>Resumen general</h4>
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                <div className="chart-container">
                    <Bar datasetIdKey='id' data={{
                        labels: actionTypes,
                        datasets:[{
                            // id: 1,
                            label: 'pob LGBTIQ',
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
                        label: 'mujeres',
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
                        label: 'pob indigena',
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
                        label: 'participantes',
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
                        label: 'pob rural',
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
                <div className="chart-container">
                <h4>Resumen por genero</h4>
                <Doughnut data={{labels:["mujeres", "hombres", "NB", "NI"], datasets: [{
                        // id: 1,
                        label: '# participantes',
                        backgroundColor: [VIOLET, BLUE, ORANGE, GREEN],
                        data: totalGenders,
                }]}} options={options} />
                </div>
                <div className="chart-container">
                <h4>Resumen por tipo de poblacion</h4>
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
                labels: ['A1', 'A2', 'A3', 'A4'],
                datasets:[{
                  // id: 1,
                  label: 'pob. LGBTIQ',
                  backgroundColor: ORANGE,
                  data: total.totalLGBT,
                },
                {
                  // id: 2,
                  label: 'mujeres',
                  backgroundColor: BLUE,
                  data: total.totalMujeres,
                },
                {
                  // id: 3,
                  label: 'pob. indígena',
                  backgroundColor: GREEN,
                  data: total.totalInd,
                },
                {
                  // id: 4,
                  label: 'pob. rural',
                  backgroundColor: VIOLET,
                  data: total.totalRural,
                },
                {
                  // id: 5,
                  label: 'participantes',
                  backgroundColor: YELLOW,
                  data: total.totalParticipantes,
                }
            ]
          }} style={{display:"inline-block"}} />
    </div>
    );
}